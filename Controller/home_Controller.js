const db = require("../db/database");

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
          element.players = element.players.split(",").map((id) => id.trim());
        } else {
          element.players = null;
        }

        const turfmediaquery = `select tm.media_path,mt.media_name from turf_media as tm
        left join media_types as mt on tm.media_type = mt.id where tm.turf_id = $1`;
        const turfvalue = [element.id];
        const turf_media = await db.query(turfmediaquery, turfvalue);

        element.media = turf_media.rowCount > 0 ? turf_media.rows : null;
        element.amenities =
          element.amenities.rowCount > 0 ? element.amenities.rows : null;
        element.sports =
          element.sports.rowCount > 0 ? element.sports.rows : null;
        element.players =
          element.players.rowCount > 0 ? element.players.rows : null;

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

      element.amenities =
        element.amenities.rowCount > 0 ? element.amenities.rows : null;
      return element;
    });
    const results = await Promise.all(getTurfs);
    res.status(200).json({ sucess: true, result: results });
  } else {
    res.status(403).json({ err: "No latest truf details" });
  }
};
