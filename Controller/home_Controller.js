const db = require("../db/database");

module.exports.getnearbyturf = async (req, res) => {
  try {
    const getTurf = await db.query(
      "select * from turfs order by id desc limit 8"
    );

    if (getTurf.rowCount > 0) {
      getTurf.rows.map(async (element, index) => {
        if (element.amenities !== null && element.amenities !== "") {
          const ids = element.amenities.split(",").map((id) => id.trim());

          // Prepare parameterized query
          const query = `SELECT * FROM amenities WHERE id = ANY($1::int[])`;
          const values = [ids];

          element.amenities = await db.query(query, values);
          res.status(200).json({ result: element.amenities });
        }

        if (element.sports !== null && element.sports !== "") {
          const sportids = element.sports.split(",").map((id) => id.trim());

          const query = `select * from sports where id = ANY($1::int[])`;
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

        if (turf_media.rowCount > 0) {
          element[index].media = turf_media;
        } else {
          element[index].media = null;
        }
      });
    } else {
      res.status(403).json({ error: "No turf available" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
