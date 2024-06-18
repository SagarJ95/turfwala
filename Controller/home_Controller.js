const db = require("../db/database");
require("dotenv").config();
const format = require("pg-format");

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
            "SELECT amenity_name, id FROM amenities WHERE id IN (%L)",
            amenitiesData
          );

          const getAmenties = await db.query(amenitiesQuery);

          if (getAmenties.rowCount > 0) {
            element.amenities = getAmenties.rows;
          } else {
            element.amenities = null;
          }
        }

        //element.amenities = element.amenities ? element.amenities : null;

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
      "select * from turfs order by id desc limit 8"
    );

    if (getTurf.rowCount > 0) {
      const turfQueries = getTurf.rows.map(async (element, index) => {
        if (element.amenities !== null && element.amenities !== "") {
          const ids = element.amenities.split(",").map((id) => id.trim());

          // Prepare parameterized query
          const query = `SELECT id,amenity_icon,amenity_name FROM amenities WHERE id = ANY($1::int[])`;
          const values = [ids];

          element.amenities = await db.query(query, values);
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
        element.sports =
          element.sports.rowCount > 0 ? element.sports.rows : null;
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
