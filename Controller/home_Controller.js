const db = require("../db/database");

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
      if (Turfs.amenities !== null || Turfs.amenities !== "") {
        const amenitiesId = Turfs.amenities.split(",").map((id) => {
          return id.trim();
        });
        const amenitiesQUery = `select * from amenities where id = ANY($1::int[])`;
        Turfs.amenities = await db.query(amenitiesQUery, [amenitiesId]);
      }

      if (Turfs.sports !== null || Turfs.sports !== "") {
        const sportsId = Turfs.sports.split(",").map((id) => {
          return id.trim();
        });
        const sportsQUery = `select * from sports where id = ANY($1::int[])`;
        Turfs.sports = await db.query(sportsQUery, [sportsId]);
      }

      if (Turfs.players !== null || Turfs.players !== "") {
        Turfs.players = Turfs.players.split(",").map((id) => {
          return id.trim();
        });
      } else {
        Turfs.players = null;
      }

      const turfmediaQuery = `select tm.media_path,mt.media_name from turf_media as tm
      left join media_types as mt on tm.media_type = mt.id where tm.turf_id = $1`;
      const turfValue = [Turfs.id];
      const Turf_Media = await db.query(turfmediaQuery, turfValue);

      if (Turf_Media.rowCount > 0) {
        Turfs.media = turf_media.rows;
      } else {
        Turfs.media = null;
      }

      res.status(200).json({ success: true, result: Turfs });
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: "Somthing wrong" });
  }
};
