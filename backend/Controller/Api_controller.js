const db = require("../db/database");
require("dotenv").config();
const moment = require("moment");
const format = require("pg-format");
const bcryptjs = require("bcryptjs");
const jwt = require("../utilites/jwt");
const axios = require("axios");
require("dotenv").config();
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const { password } = require("pg/lib/defaults");
const knex = require("knex")({
  client: "pg", // Specify the database client
});

// User register
module.exports.register = async (req, res) => {
  try {
    const { name, email, mobile_number, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(409).json({ errors: errors.array() });
    } else {
      const checkEmailId = await db.query(
        "select * from users where email = $1",
        [email]
      );

      if (checkEmailId.rows.length > 0) {
        res.status(403).json({
          error: "Email already register. Please Enter Different email Id",
        });
      } else {
        bcryptjs.hash(password, 10, async (err, hashPassword) => {
          if (err) {
            res.status(403).json({ error: err.message });
          } else {
            const registerUser = await db.query(
              "Insert into users(name,email,mobile_no,password) values ($1,$2,$3,$4)  RETURNING *",
              [name, email, mobile_number, hashPassword]
            );

            if (registerUser.rowCount > 0) {
              // Generate JWT Token
              const AccessToken = jwt.generateToken(registerUser.rows[0].id);
              res.status(200).json({
                message: "User Register Successfully",
                access_token: AccessToken,
              });
            } else {
              res.status(403).json({ error: "Something went wrong" });
            }
          }
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// User Login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(409).json({ errors: errors.array() });
    } else {
      const checkEmailId = await db.query(
        "select * from users where email = $1",
        [email]
      );

      if (checkEmailId.rows.length == 0) {
        res.status(403).json({
          error: "Email Not register. Please First register",
        });
      } else {
        bcryptjs.compare(
          password,
          checkEmailId.rows[0].password,
          async (err, hashPassword) => {
            if (err) {
              res.status(403).json({ error: err.message });
            } else {
              // Generate JWT Token
              const AccessToken = jwt.generateToken(checkEmailId.rows[0].id);
              res.status(200).json({
                message: "User Login Successfully",
                access_token: AccessToken,
              });
            }
          }
        );
      }
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

/** get turfs based filter apply */
module.exports.getturfs = async (req, res) => {
  try {
    const { sport_id, amenity_id, players, sizes, pages } = req.body;

    let query = `Select t.id,t.turf_name,t.turf_no,t.amenities,t.sports,t.players,t.city,t,pincode,
    COALESCE(rx.Averageratings,0) as AverageRating,COALESCE(rx.RatingCount, 0) as RatingCount  from turfs as t left join
    (select r.turf_id, AVG(r.rating) AS Averageratings, COUNT(r.rating) AS RatingCount
    from reviews r group by r.turf_id ) AS rx on rx.turf_id = t.id where deleted_at IS NULL`;

    if (sport_id && sport_id.toString().length > 0) {
      query += ` AND t.sports IN (${sport_id
        .map((id) => `'${id}'`)
        .join(",")})`;
    }

    if (amenity_id && amenity_id.toString().length > 0) {
      query += ` AND t.amenities IN (${amenity_id
        .map((id) => `'${id}'`)
        .join(",")})`;
    }

    if (players && players.toString().length > 0) {
      query += ` AND t.players IN (${players
        .map((id) => `'${id}'`)
        .join(",")})`;
    }

    if (sizes != "" && typeof sizes != "undefined") {
      var size = sizes.split("-");
      var minSize = size[0] ? size[0] : 0;
      var maxSize = size[1] ? size[1] : 10000;

      query += `where t.turf_size between ${minSize} and ${maxSize}`;
    }

    const limit = req.limit ? req.limit : 8;
    const page = req.page ? req.page : 1;

    if (pages > 1) {
      const start = (req.page - 1) * limit;
    } else {
      const start = 0;
    }

    query += ` order by t.id desc`;

    const turfs = await db.query(query, []);

    if (turfs.rowCount > 0) {
      const turfCount = turfs.rowCount;
      const total_page = Math.ceil(turfCount / limit);

      const turfsQuery = turfs.rows.map(async (element, index) => {
        if (element.amenities !== null && element.amenities !== "") {
          const amenitiesData = element.amenities.split(",").map(Number);
          const amenitiesQuery = format(
            "SELECT amenity_name,front_icon id FROM amenities WHERE id IN (%L)",
            amenitiesData
          );

          const getAmenties = await db.query(amenitiesQuery);

          if (getAmenties.rowCount > 0) {
            element.amenities = getAmenties.rows;
          } else {
            element.amenities = null;
          }
        }

        if (element.sports !== null && element.sports !== "") {
          const sportData = element.sports.split(",").map(Number);
          const sportQQuery = format(
            "select sport_name,front_icon from sports where id IN (%L)",
            sportData
          );

          const getSport = await db.query(sportQQuery);

          if (getSport.rowCount > 0) {
            element.sports = getSport.rows;
          } else {
            element.sports = null;
          }
        }

        if (element.players !== null && element.players !== "") {
          element.players = element.players.split(",").map((id) => {
            return id.trim();
          });
        } else {
          element.players = null;
        }

        const turfmediaquery = `select tm.media_path,mt.media_name from turf_media as tm
        left join media_types as mt on tm.media_type = mt.id where tm.turf_id = $1`;
        const turfvalue = [element.id];
        const turf_media = await db.query(turfmediaquery, turfvalue);

        if (turf_media.rowCount > 0) {
          element.media = turf_media.rows;
        } else {
          element.media = null;
        }

        return element;
      });

      const result = await Promise.all(turfsQuery);

      res.status(200).json({
        code: 1,
        msg: "Turfs Found",
        data: result,
        total: turfs.rowCount,
        total_pages: total_page,
        next: total_page > page ? page + 1 : 0,
        prev: page - 1,
      });
    } else {
      res.status(404).json({
        code: 3,
        msg: "Turfs Not Found",
        data: [],
        total: turfs.rowCount,
        total_pages: 0,
        next: 0,
        prev: 0,
      });
    }
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

/**** get near by turf ******/
module.exports.getnearbyturf = async (req, res) => {
  try {
    const getTurf = await db.query(
      `       SELECT
                t.address,
                t.id,
                t.turf_name,
                t.turf_no,
                t.amenities,
                t.sports,
                t.players,
                t.city,
                t.pincode,
                t.latitude,
                t.longitude,
                t.region,
                COALESCE(rx.AverageRatings, 0) AS AverageRating,
                COALESCE(rx.RatingCount, 0) AS RatingCount
            FROM
                turfs t
            LEFT JOIN (
                SELECT
                    r.turf_id,
                    AVG(r.rating) AS AverageRatings,
                    COUNT(r.rating) AS RatingCount
                FROM
                    reviews r
                GROUP BY
                    r.turf_id
            ) rx ON rx.turf_id = t.id
            WHERE
                t.deleted_at IS NULL
              order by id desc limit 8`
    );

    if (getTurf.rowCount > 0) {
      const turfQueries = getTurf.rows.map(async (element, index) => {
        if (element.amenities !== null && element.amenities !== "") {
          const ids = element.amenities.split(",").map((id) => id.trim());

          // Prepare parameterized query
          const query = `SELECT id,amenity_icon,amenity_name FROM amenities WHERE id = ANY($1::int[])`;
          const values = [ids];

          const { rows: amenitiesData } = await db.query(query, values);

          const getAmenties = amenitiesData.map((data) => ({
            ...data,
            amenity_icon: `${process.env.LOCAL_PATH}/${data.amenity_icon}`,
          }));

          if (amenitiesData.length > 0) {
            element.amenities = getAmenties;
          } else {
            element.amenities = null;
          }
        }

        if (element.sports !== null && element.sports !== "") {
          const sportids = element.sports.split(",").map((id) => id.trim());

          const query = `select id,front_icon,sport_name from sports where id = ANY($1::int[])`;
          const values = [sportids];

          const { rows: sportsResult } = await db.query(query, values);
          const sportsData = sportsResult.map((sp) => ({
            ...sp,
            front_icon: `${process.env.LOCAL_PATH}/${sp.front_icon}`,
          }));

          if (sportsResult.length > 0) {
            element.sports = sportsData;
          } else {
            element.sports = null;
          }
        }

        if (element.players !== null && element.players !== "") {
          element.players = element.players.split(",").map((id) => {
            return id.trim();
          });
        } else {
          element.players = null;
        }

        const turfmediaquery = `select tm.media_path,mt.media_name from turf_media as tm
        left join media_types as mt on tm.media_type = mt.id where tm.turf_id = $1`;

        const turfvalue = [element.id];
        const { rows: turf_media } = await db.query(turfmediaquery, turfvalue);
        const turfMedia = turf_media.map((medias) => ({
          ...medias,
          media_path: `${process.env.LOCAL_PATH}/${medias.media_path}`,
        }));

        if (turf_media.length > 0) {
          element.media = turfMedia;
        } else {
          element.media = null;
        }

        element.media = element.media ? element.media : null;
        element.amenities = element.amenities;
        element.sports = element.sports;
        element.players = element.players ? element.players : null;

        return element;
      });

      const result = await Promise.all(turfQueries);
      res.status(200).json({
        sucess: true,
        count: result.toString().length,
        result: result,
      });
    } else {
      res.status(403).json({ error: "No turf available" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

/**** get latest turf ******/
module.exports.getleastturf = async (req, res) => {
  const getLeastTurflist = await db.query(
    "select * from turfs as t where t.deleted_at is null order by t.id desc limit 8"
  );

  if (getLeastTurflist.rowCount > 0) {
    const getTurfs = getLeastTurflist.rows.map(async (element, index) => {
      if (element.amenities !== null || element.amenities !== "") {
        const amenities_data = element.amenities.split(",").map((id) => {
          return id.trim();
        });

        const amenities_query = `select id,amenity_icon,amenity_name from amenities where id = ANY($1::int[])`;
        const amenities_parameter = [amenities_data];
        element.amenities = await db.query(
          amenities_query,
          amenities_parameter
        );
      }

      if (element.sports !== null && element.sports !== "") {
        const sportids = element.sports.split(",").map((id) => id.trim());

        const query = `select id,sport_icon,sport_name from sports where id = ANY($1::int[])`;
        const values = [sportids];

        element.sports = await db.query(query, values);
      }

      if (element.players !== null && element.players !== "") {
        element.players = element.players.split(",").map((id) => {
          return id.trim();
        });
      } else {
        element.players = null;
      }

      const turfmediaquery = `select tm.media_path,mt.media_name from turf_media as tm
      left join media_types as mt on tm.media_type = mt.id where tm.turf_id = $1`;
      const turfvalue = [element.id];
      const turf_media = await db.query(turfmediaquery, turfvalue);

      if (turf_media.rowCount > 0) {
        element.media = turf_media.rows;
      } else {
        element.media = null;
      }

      element.media = element.media ? element.media : null;
      element.amenities =
        element.amenities.rowCount > 0 ? element.amenities.rows : null;
      element.sports = element.sports.rowCount > 0 ? element.sports.rows : null;
      element.players = element.players ? element.players : null;

      return element;
    });
    const results = await Promise.all(getTurfs);
    res.status(200).json({ sucess: true, result: results });
  } else {
    res.status(403).json({ err: "No latest truf details" });
  }
};

/**** get Top turf */
module.exports.getTopTurf = async (req, res) => {
  const getQuery = `SELECT t.id, t.turf_name,t.turf_no, t.amenities,t.sports,t.players,COALESCE(rx.Averageratings, 0) as AverageRating,
                  COALESCE(rx.RatingCount, 0) as RatingCount FROM turfs t LEFT JOIN
                  (SELECT
                      r.turf_id,
                      AVG(r.rating) AS Averageratings,
                      COUNT(r.rating) AS RatingCount
                  FROM
                      reviews r
                  GROUP BY
                      r.turf_id) rx ON rx.turf_id = t.id ORDER BY AverageRating DESC LIMIT 8`;

  const getTopturfInfo = await db.query(getQuery);

  if (getTopturfInfo.rowCount > 0) {
    const getTopTurf = getTopturfInfo.rows.map(async (element, index) => {
      if (element.amenities !== null && element.amenities !== "") {
        const amenitiesArrray = element.amenities.split(",").map((id) => {
          return id.trim();
        });
        const amenitiesData = [amenitiesArrray];
        const amenitiesQuery = `select amenity_name,front_icon from amenities where id = ANY($1::int[])`;
        element.amenities = await db.query(amenitiesQuery, amenitiesData);
      }

      if (element.sports !== null || element.sports !== "") {
        const sportsArrray = element.sports.split(",").map((id) => {
          return id.trim();
        });
        const sportsData = [sportsArrray];
        const sportsQuery = `select sport_name,front_icon from sports where id = ANY($1::int[])`;
        element.sports = await db.query(sportsQuery, sportsData);
      }

      if (element.players !== null || element.players !== "") {
        element.players = element.players.split(",").map((id) => {
          return id.trim();
        });
      } else {
        element.players = null;
      }

      const turfmediaquery = `select tm.media_path,mt.media_name from turf_media as tm
      left join media_types as mt on tm.media_type = mt.id where tm.turf_id = $1`;
      const turfvalue = [element.id];
      const turf_media = await db.query(turfmediaquery, turfvalue);

      if (turf_media.rowCount > 0) {
        element.media = turf_media.rows;
      } else {
        element.media = null;
      }

      element.amenities =
        element.amenities.rowCount > 0 ? element.amenities.rows : null;
      element.sports = element.sports.rowCount > 0 ? element.sports.rows : null;
      element.players = element.players ? element.players : null;
      element.media = element.media ? element.media : null;

      return element;
    });
    const getTopTurfDetails = await Promise.all(getTopTurf);
    res.status(200).json({ sucess: true, result: getTopTurfDetails });
  } else {
    res.status().json({ sucess: false, msg: "No turf available" });
  }
};

/** get turf info based on Id */
module.exports.getTurfInfoDetails = async (req, res) => {
  try {
    const { id } = req.body;

    const Turfs = await db.query("select * from turfs where id = $1", [id]);

    if (Turfs.rowCount == 0) {
      res.status(403).json({
        success: false,
        msg: "Turf Does Not Exists or Been Removed By Admin",
      });
    } else {
      if (Turfs.rows[0].amenities !== null || Turfs.rows[0].amenities !== "") {
        const amenitiesId = Turfs.rows[0].amenities.split(",").map((id) => {
          return id.trim();
        });

        const amenitiesQUery = `select * from amenities where id = ANY($1::int[])`;
        const AmentitesRecords = await db.query(amenitiesQUery, [amenitiesId]);

        if (AmentitesRecords.rowCount > 0) {
          Turfs.rows[0].amenities = AmentitesRecords.rows;
        } else {
          Turfs.rows[0].amenities = null;
        }
      }

      if (Turfs.rows[0].sports !== null || Turfs.rows[0].sports !== "") {
        const sportsId = Turfs.rows[0].sports.split(",").map((id) => {
          return id.trim();
        });
        const sportsQUery = `select * from sports where id = ANY($1::int[])`;
        const sportsDetalis = await db.query(sportsQUery, [sportsId]);

        if (sportsDetalis.rowCount > 0) {
          Turfs.rows[0].sports = sportsDetalis.rows;
        } else {
          Turfs.rows[0].sports = null;
        }
      }

      if (Turfs.rows[0].players !== null || Turfs.rows[0].players !== "") {
        Turfs.rows[0].players = Turfs.rows[0].players.split(",").map((id) => {
          return id.trim();
        });
      } else {
        Turfs.rows[0].players = null;
      }

      const turfmediaQuery = `select tm.media_path,mt.media_name from turf_media as tm
      left join media_types as mt on tm.media_type = mt.id where tm.turf_id = $1`;
      const turfValue = [Turfs.rows[0].id];
      const Turf_Media = await db.query(turfmediaQuery, turfValue);

      if (Turf_Media.rowCount > 0) {
        Turfs.rows[0].media = Turf_Media.rows;
      } else {
        Turfs.rows[0].media = null;
      }

      res.status(200).json({ success: true, result: Turfs.rows[0] });
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: "Somthing wrong" });
  }
};

/** get Review Info */
module.exports.getReviewDetails = async (req, res) => {
  try {
    const { id } = req.body;
    const checkTurf = await db.query("select * from turfs where id = $1", [id]);

    if (checkTurf.rowCount == 0) {
      res.status(403).json({
        success: false,
        msg: "Truf Doesn't exits. Please try another turf",
      });
    } else {
      const limit = 2;
      const reviewQuery = `select r.id,r.user_id,r.turf_id,r.rating,r.comment,u.name,
       r.image_1,
        r.image_2,
        r.image_3,
        r.image_4,
        r.image_5,
        r.created_at from reviews as r left join users as u on r.user_id = u.id where r.turf_id = $1 limit $2`;
      const reviewId = [id, limit];
      const getTurfReview = await db.query(reviewQuery, reviewId);

      if (getTurfReview.rowCount > 0) {
        res.status(200).json({ success: true, result: getTurfReview.rows });
      } else {
        res.status(403).json({ success: false, result: [] });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Something Wrong",
    });
  }
};

/** store review */
module.exports.store_review = async (req, res) => {
  try {
    const { user_id, turf_id, rating, comments } = req.body;

    const checkTurfDetails = await db.query(
      "select * from turfs where id = $1",
      [turf_id]
    );

    //upload file get into array
    var images = req.files;
    var imagesArray = [];
    for (var i = 0; i < images.length; i++) {
      imagesArray.push(images[i].filename);
    }

    if (checkTurfDetails.rowCount == 0) {
      res.status(403).json({ success: false, msg: "Turf doen't exists" });
    } else {
      const checkReviewCount = await db.query(
        "select * from reviews where user_id = $1 and turf_id = $2",
        [user_id, turf_id]
      );

      if (checkReviewCount.rowCount >= 1) {
        res.status(400).json({
          success: false,
          msg: "Not eligible to add multiple review",
        });
      } else {
        var image_1 = imagesArray && imagesArray[0] ? imagesArray[0] : "";
        var image_2 = imagesArray && imagesArray[1] ? imagesArray[1] : "";
        var image_3 = imagesArray && imagesArray[2] ? imagesArray[2] : "";
        var image_4 = imagesArray && imagesArray[3] ? imagesArray[3] : "";
        var image_5 = imagesArray && imagesArray[4] ? imagesArray[4] : "";
        console.log("image_3", image_3);
        const StoreReviews = await db.query(
          "Insert Into reviews(user_id,turf_id,rating,comment,image_1,image_2,image_3,image_4,image_5) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
          [
            user_id,
            turf_id,
            rating,
            comments,
            image_1,
            image_2,
            image_3,
            image_4,
            image_5,
          ]
        );

        const reviewId = StoreReviews.rows[0].id;
        if (reviewId != "") {
          res
            .status(200)
            .json({ success: true, msg: "Store Review Successfully" });
        } else {
          res
            .status(201)
            .json({ success: true, msg: "Store Review UnSuccessfully" });
        }
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: "Somthing Wrong" });
  }
};

// check turf availibality
module.exports.check_availibality = async (req, res) => {
  const { booking_date, turf_id, user_id } = req.body;
  var day = new Date(booking_date);
  var Years = new Date(booking_date).getFullYear();
  var Month = new Date(booking_date).getMonth() + 1;
  var days = new Date(booking_date).getDate();

  var options = { weekday: "long" };
  var dayName = day.toLocaleDateString("en-US", options);

  var dateFormat = `${Years}-${Month}-${days}`;

  const check_slot = `select * from custom_turf_slots where turf_id = ${turf_id} and  DATE(slot_date) = '${dateFormat}' LIMIT 1`;
  const getRecordsCheckSlot = await db.query(check_slot, []);

  if (getRecordsCheckSlot.rows.length != 0) {
    var getTurfTimeing = getRecordsCheckSlot;
  } else {
    var turf_timings = `select turf_slots.*,t.slot from turf_slots
                          left join turfs as t on turf_slots.turf_id = t.id
                          where turf_slots.turf_id = ${turf_id}
                          and t.deleted_at IS NULL and day = '${dayName}' order by opening_slot_time asc`;

    var getTurfTimeing = await db.query(turf_timings, []);
  }

  var tur_book = `select tb.*,bs.start_time,bs.end_time,bs.booking_date from turf_bookings as tb
                      left join booking_slots as bs ON tb.id = bs.booking_id
                      where CAST(tb.turf_id AS BIGINT) = ${turf_id} and DATE(bs.booking_date) = '${dateFormat}' and tb.deleted_at IS  NULL`;

  var get_turf_bookings = await db.query(tur_book, []);

  var slots = [];
  var i = 0;

  if (getTurfTimeing) {
    for (i = 0; i < getTurfTimeing.rows.length; i++) {
      var start_date_time = getTurfTimeing.rows[i].opening_slot_time;
      var end_date_time = getTurfTimeing.rows[i].closing_slot_time;
      let start_today = new Date();
      let start_end = new Date();
      let [hours, minutes, seconds] = start_date_time.split(":");
      let [endhours, endminutes, endseconds] = end_date_time.split(":");

      // Set time on today's date
      start_today.setHours(parseInt(hours));
      start_today.setMinutes(parseInt(minutes));
      start_today.setSeconds(parseInt(seconds));
      start_today.setMilliseconds(0);

      start_end.setHours(parseInt(endhours));
      start_end.setMinutes(parseInt(endminutes));
      start_end.setSeconds(parseInt(endseconds));
      start_end.setMilliseconds(0);

      let start_time = start_today.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      let end_time = start_end.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      slots[i] = {
        start_time: start_date_time,
        end_time: end_date_time,
        booking_date: dateFormat,
        display_time: `${start_date_time}-${end_date_time}`,
        price: getTurfTimeing.rows[i].price,
        discounted_price: getTurfTimeing.rows[i].discounted_price,
        booked: false,
      };

      if (get_turf_bookings.rows.length != 0) {
        for (var j = 0; j < get_turf_bookings.rows.length; j++) {
          if (get_turf_bookings[j].booking_date == dateFormat) {
            if (
              get_turf_bookings[j].start_time == start_time &&
              get_turf_bookings[j].end_time == end_time
            ) {
              slots[i].booked = true;
            }
          }
        }
      }

      if (user_id != "") {
        var getSlots = `select * from slot_cart where Date(booking_date) = '${dateFormat}' and user_id = ${user_id} and status = 1`;
        var get_slots = await db.query(getSlots, []);

        if (get_slots.rows.length != 0) {
          get_slots.rows.map((element, index) => {
            if (
              element.start_time == display_time &&
              element.end_time == display_endtime
            ) {
              slots[i].user_booked = true;
              slots[i].user_booked = element.id;
            }
          });
        } else {
          slots[i].user_booked = false;
        }
      }

      start_time = null;
      end_time = null;
    }

    if (get_turf_bookings.rows.length != 0) {
      res.status(200).json({
        code: 1,
        msg: "Turf Bookings",
        timings: getTurfTimeing.rows,
        data: get_turf_bookings.rows,
        slots: slots,
      });
    } else {
      res.status(200).json({
        code: 3,
        msg: "No Bookings for this turf",
        timings: getTurfTimeing.rows,
        data: [],
        slots: slots,
      });
    }
  }
};

// GET Geo Code
module.exports.getGetCode = async (req, res) => {
  try {
    const { lat, long } = req.body;

    const getResponse = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          latlng: `${lat},${long}`,
          sensor: "true",
          key: process.env.GOOGLE_MAP_API_KEY,
        },
      }
    );

    if (getResponse.data.status == "OK") {
      const address = getResponse.data.results[0].formatted_address;
      res.status(200).json({ code: 1, data: address });
    } else {
      res.status(400).json({
        code: 2,
        error: "No address found for the provided coordinates",
      });
    }
  } catch (e) {
    res.status(400).json({
      error: e.message(),
    });
  }
};

// GET Sport
module.exports.get_sports = async (req, res) => {
  try {
    const sports = await db.get("select sport_icon,sport_name from sports");

    if (sports.length > 0) {
      res.status(200).json({ code: 1, data: sports });
    } else {
      res.status(400).json({ code: 2, error: "Sports Not Found" });
    }

    console.log("sports", sports);
  } catch (e) {
    res.status(400).json({
      error: e.message(),
    });
  }
};

//get amentites
module.exports.get_amenities = async (req, res) => {
  try {
    const getAmenties = await db.get("select amenity_name from amenities");

    if (getAmenties.length > 0) {
      res.status(200).json({ code: 1, data: getAmenties });
    } else {
      res.status(400).json({ code: 2, error: "Amenities Not Found" });
    }
  } catch (e) {
    res.status(400).json({ code: 3, error: e.message });
  }
};

//get subscribe
module.exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (email != "") {
      const nademailer = nodemailer.createTransport({
        service: "gmail",
        auth: {
          username: "",
          password: "",
        },
      });

      const mailinfo = {
        from: "sagrjagade2023@gmail.com",
        to: "sagar.jagade@onerooftech.com",
        subject: "Please Enter subject",
        text: "Sending subscribe",
      };

      nodemailer.sendMail(mailinfo, function (err, res) {
        if (res) {
          res.status(200).json({
            email: email,
            message: `Send The massage sucessfullly - ${res.response}`,
          });
        } else {
          res.status(200).json({ error: err });
        }
      });
    } else {
      res.status(200).json({ message: "Please Provide Email Address" });
    }
  } catch (e) {
    res.status(400).json({ error: e.message() });
  }
};

//get pricing chart
module.exports.getPricingChart = async (req, res) => {
  try {
    const { id } = req.body;

    const checkValExits = await db.query("select * from turfs where id = $1", [
      id,
    ]);

    if (checkValExits.rowCount == 0) {
      res
        .status(200)
        .json({ message: "Turf Does Not Exists or Been Removed By Admin" });
    }

    const pricing_chart = await db.query(
      "select * from turf_media where turf_id = $1 and media_type = $2",
      [id, 4]
    );

    if (pricing_chart.rowCount > 0) {
      if (pricing_chart.rows.media_path != null) {
        res.status(200).json({
          code: 1,
          msg: "Pricing Chart Found",
          data: pricing_chart.rows[0],
        });
      } else {
        res.status(200).json({
          code: 2,
          msg: "Pricing Not Chart Found",
          data: pricing_chart.rows[0],
        });
      }
    } else {
      res.status(200).json({ message: "Pricing Chart Not Found" });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//save personal info
module.exports.savePersonalInfo = async (req, res) => {
  try {
    const { name, email, mobile_number } = req.body;

    const updateQuery = `update users SET name = ${1}, email = ${2}, mobile_no = ${3} where id = ${id}`;
    const update = await db.query(updateQuery, [
      name,
      email,
      mobile_number,
      id,
    ]);

    if (update.rowCount > 0) {
      res.status(200).json({ code: 1, msg: "Info Stored Successfully" });
    } else {
      res.status(200).json({ code: 2, msg: "Something went to wrong" });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//change password
module.exports.change_password = async (req, res) => {
  try {
    const { id, password } = req.body;

    bcryptjs.hash(password, 10, async (err, hashPassword) => {
      if (err) {
        res.status(400).json({
          code: 3,
          msg: "Something went wrong with password",
        });
      } else {
        const upatePassword = await db.query(
          "update users SET password = $1 where id = $2",
          [hashPassword, id]
        );

        if (upatePassword.rowCount > 0) {
          res
            .status(200)
            .json({ code: 1, msg: "Update Password successfully" });
        } else {
          res
            .status(200)
            .json({ code: 2, msg: "Unsuccessfully Update Password" });
        }
      }
    });
  } catch (e) {
    res.status(400).json({ code: 4, msg: e.message });
  }
};

//get user booking
module.exports.get_user_booking = async (req, res) => {
  try {
    const { id, status, pageno } = req.body;
    const perPage = 5;

    const offset = (pageno - 1) * perPage;

    const userQuery = `select tb.id,tb.turf_id,tb.total_amount,tb.turf_name,tb.status,tb.cancel_reason
                       from turf_bookings as tb left join turfs as t on tb.turf_id = t.id
                      where tb.user_id = ${1} and tb.status = ${2} order by id desc offset ${3} limit ${4}`;

    const total_items = await db.query(userQuery, [
      id,
      status,
      offset,
      perPage,
    ]);

    if (total_items.rowCount > 0) {
      res.status(200).json({
        code: 1,
        msg: "Data found successfully",
        data: total_items.rows[0],
        total_items: total_items.rowCount,
      });
    } else {
      res.status(200).json({ code: 2, msg: "No Data Found" });
    }
  } catch (e) {
    res.status(400).json({ code: 3, msg: e.message });
  }
};

//cancelbooking
module.exports.cancel_booking = async (req, res) => {
  try {
    const { booking_id, cacnel_reason } = req.body;

    const reason = `Booking Cancelled By User -- ${cacnel_reason}`;
    const change_status = await db.query(
      "update turf_bookings SET status = $1, cancel_reason = $2 where id = $3",
      [2, reason, booking_id]
    );

    if (change_status.rowCount > 0) {
      const getbooking = await db.query(
        "select * from turf_booking where id=$1",
        [booking_id]
      );

      const bookingInfo = {
        name: getbooking.rows[0].user_name,
        booking_id: "Tw",
        reason: cacnel_reason,
      };

      //send mail
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: { username: "", password: "" },
      });

      const mailInfcancel = {
        from: "",
        to: "",
        subject: "Turfwala | Booking Cancelled",
        text: "",
      };

      transport.sendMail(mailInfcancel, async (err, result) => {
        if (err) {
          res.status(200).json({ code: 3, msg: err });
        } else {
          res.status(200).json({ code: 1, msg: "Booking Cancelled" });
        }
      });
    } else {
      res.status(200).json({
        code: 2,
        msg: "Something went wrong. Please try again later.",
      });
    }
  } catch (e) {
    res.status(400).json({ code: 3, msg: e.message });
  }
};

//remove slot
module.exports.remove_slot = async (req, res) => {
  try {
    const { cart_id } = req.body;

    const removeSlot = await db.query(
      "update slot_cart SET status = $1, updated_at = $2 Where id = $3",
      [0, new Date(), cart_id]
    );

    if (removeSlot.rowCount > 0) {
      res.status(200).json({ code: 1, msg: "Remove Slots" });
    } else {
      res.status(200).json({ code: 2, msg: "Something went wrong" });
    }
  } catch (e) {
    res.status(400).json({ code: 4, msg: e.message });
  }
};

//view slot
module.exports.view_slot = async (req, res) => {
  try {
    const { turf_id, user_id } = req.body;

    const checkIdavailable = await db.query(
      "select * from  turfs where id=$1 and deleted_at IS NOT NULL",
      [turf_id]
    );

    if (checkIdavailable.rowCount > 0) {
      res.status(200).json({ code: 2, msg: "Turf Doesn't exits" });
    }

    const selected_slots = await db.query(
      "select id,booking_date,start_time,end_time,TO_CHAR(start_time, 'HH:MI AM') as display_start,TO_CHAR(end_time, 'HH:MI AM') as display_end,TO_CHAR(booking_date, 'Mon DD, YYYY') as display_date from slot_cart where turf_id = $1 and user_id = $2 and status =$3",
      [turf_id, user_id, 1]
    );

    const total_price = await db.query(
      "select SUM(price) AS total_price from slot_cart where turf_id = $1 and user_id = $2 and status =$3",
      [turf_id, user_id, 1]
    );

    if (selected_slots.rowCount > 0) {
      res.status(200).json({
        code: 1,
        msg: "Slots Found",
        data: selected_slots.rows[0],
        total_price: total_price.rows[0].total_price,
      });
    } else {
      res.status(200).json({
        code: 3,
        msg: "Slots Not Found",
        data: "",
        total_price: "",
      });
    }
  } catch (e) {
    res.status(400).json({ code: 4, msg: req.message });
  }
};

// Turf Booking for Front User
module.exports.book_turf = async (req, res) => {
  try {
    const {
      user_name,
      email,
      mobile_number,
      turf_id,
      players,
      amount_received,
      booking_slots,
    } = req.body;

    const check_user = await db.query(
      "select * from users where email =$1 OR mobile_no = $2 ",
      [email, mobile_number]
    );

    if (check_user.rowCount > 0) {
      bcryptjs.hash(mobile_number, 10, async (err, hashP) => {
        if (err) {
          res.status(400).json({ code: 4, msg: req.message });
        } else {
          const InsertQuery = `Insert into users(name,email,mobile_no,password) values($1,$2,$3,$4) RETURNING *`;
          const excuteQuery = await db.query(InsertQuery, [
            user_name,
            email,
            mobile_number,
            hashP,
          ]);

          const getUserId = excuteQuery.rows[0].id;
        }
      });
    } else {
      const get_user = check_user.rows[0].id;
    }

    const createBooking = `Insert into turf_booking(turf_id,players,user_id,created_at,updated_at,
                          user_name,email,mobile_no,status,amount_received) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
                          RETURNING *`;

    const save_data = await db.query(createBooking, [
      turf_id,
      players,
      get_user,
      new Date(),
      new Date(),
      user_name,
      email,
      mobile_number,
      0,
      amount_received,
    ]);

    if (save_data.rowCount > 0) {
      const booking_id = save_data.rows[0].id;
      const total_amount = 0;
      const insert_slot_data = [];

      booking_slots.forEach((element, index) => {
        const slots = element.slots;
        const slotData = {
          booking_id: booking_id,
          booking_date: element.id,
          start_time: slots[0],
          end_time: slots[1],
          price: slots[3],
          status: 0,
          created_at: new Date(),
          updated_at: new Date(),
        };

        insert_slot_data.push(slotData);
        total_amount += slots[2];
      });

      const save_slots = await knex("booking_slots").insert(insert_slot_data);

      const updateTotalAmount = await db.query(
        "update turf_bookings SET total_amount = $1 where id = $2",
        [total_amount, booking_id]
      );

      const Cart_Table = `update slot_cart SET user_id = $1 ,status = $2 where user_id = $3`;
      const getcartTable = await db.query(Cart_Table, [user_id, get_user, 0]);

      if (save_slots.rowCount > 0) {
        const user = await db.query("select * from users where id=$1", [
          get_user,
        ]);

        const pay_data = {
          payment_amount: amount_received,
          user_name: user.rows[0].user_name,
          user_email: user.rows[0].user_email,
          booking_id: booking_id,
        };

        res.status(200).json({ code: 1, msg: "Booked", data: pay_data });
      } else {
        res.status(200).json({ code: 3, msg: "Failed" });
      }
    } else {
      res.status(200).json({ code: 3, msg: "Failed" });
    }
  } catch (e) {
    res.status(400).json({
      code: 4,
      msg: e.message,
    });
  }
};

module.exports.list_turf_form = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile_no,
      turf_name,
      turf_address,
      google_maps_link,
    } = req.body;

    const insert_data = {
      name: name,
      email: email,
      mobile_no: mobile_no,
      turf_name: turf_name,
      turf_address: turf_address,
      google_maps_link: google_maps_link,
    };

    const save_data = await knex("list_turfs").insert(insert_data);

    //send mail to user
    const usermail = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-password",
      },
    });

    const userOptionConfig = {
      from: "",
      to: "",
      subject: "Turf Booking",
      text: `Your turf booking is successful`,
    };

    usermail.sendMail(userOptionConfig, (err, result) => {
      if (err) {
        res.status(400).json({ code: 3, msg: err });
        return;
      }

      res.status(200).json({ code: 1, msg: "send successfully" });
    });

    //send to admin
    const adminMailConfig = {
      from: "",
      to: "",
      subject: "New Turf Booking",
      text: `New turf booking from ${name}`,
    };

    usermail.sendMail(adminMailConfig, (err, result) => {
      if (err) {
        res.status(400).json({ code: 3, msg: err });
        return;
      }

      res.status(200).json({ code: 1, msg: "admin send successfully" });
    });

    if (save_data.rowCount > 0) {
      re.status(200).json({
        code: 1,
        msg: "Data Inserted Successfully",
      });
    } else {
      res.status(200).json({
        code: 3,
        msg: "Something went wrong. Please try again later.",
      });
    }
  } catch (e) {
    res.status(400).json({
      code: 3,
      msg: e.message,
    });
  }
};

module.exports.check_slot_availability = async (req, res) => {
  try {
    const { turf_id, slot, user_id } = req.body;
    const checkTurfid = await db.query("select * from turfs where id = $1", [
      turf_id,
    ]);

    if (checkTurfid.rowCount > 0) {
      const slot = slot.split("-");
      const booking_date = slot[0];
      const start_time = slot[1];
      const end_time = slot[2];
      const price = slot[3];

      const check_slot = await db.query(
        "select * from turf_bookings as tb left join booking_slots as bs on tb.id = bs.booking_id where tb.turf_id = $1 and bs.booking_date = $2 and bs.start_time = $3 and bs.end_time = $3 and tb.deleted_at IS NOT NULL",
        [turf_id, booking_date, start_time, end_time]
      );

      const check_cart = await db.query(
        "select * from slot_cart as tb  where tb.turf_id = $1 and bs.booking_date = $2 and bs.start_time = $3 and bs.end_time = $3 and tb.status = $4",
        [turf_id, booking_date, start_time, end_time, status]
      );

      if (check_slot.rowCount > 0) {
        const insert_data = {
          user_id: user_id,
          turf_id: turf_id,
          booking_date: booking_date,
          start_time: start_time,
          end_time: end_time,
          status: 1,
          price: price,
          created_at: new Date(),
        };
        // Remove Previous Bookings of turfs
        const today = new Date();
        const previousDate = new Date(today);
        previousDate.setDate(today.getDate() - 1);

        const formattedDate = previousDate.toISOString().split("T")[0];

        const slot_cart = await db.query(
          "update slot_cart SET booking_date <= $1 WHERE status = $2",
          [previous_date, 0]
        );
        const saveData = await knex("slot_cart").insert(insert_data);

        if (save_data.rowCount > 0) {
          res.json({ message: "Slot Added Successfully", status: 200 });
        } else {
          res.json({ message: "Failed to Add Slot", status: 400 });
        }
      } else {
        res.status(200).json({
          code: 3,
          msg: "Slot Unavailable",
        });
      }
    }
  } catch (e) {
    res.status(400).json({ code: 3, msg: e.message });
  }
};
