const express = require("express");
const db = require("../db/database");
const { validationResult } = require("express-validator");
const sharp = require("sharp");

//create new turf entry
module.exports.save_turf = async (req, res) => {
  try {
    const {
      turf_name,
      turf_size,
      address,
      contact_no_1,
      contact_no_2,
      contact_no_3,
      city,
      pincode,
      latitude,
      longitude,
      status,
      opening_time,
      closing_time,
      players,
      sports,
      amenities,
      price_chart,
    } = req.body;

    //console.log("req", req.body);
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return res.status(409).json({ errors: errors.array() });
    // }

    const turfId = await db.query(
      "Insert into turfs(turf_name,turf_size,address,contact_no_1,contact_no_2,contact_no_3,city,pincode,latitude,longitude,status,opening_time,closing_time,players,sports,amenities,price_chart) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *",
      [
        turf_name,
        turf_size,
        address,
        contact_no_1,
        contact_no_2,
        contact_no_3,
        city,
        pincode,
        latitude,
        longitude,
        status,
        opening_time,
        closing_time,
        players,
        sports,
        amenities,
        price_chart,
      ]
    );

    if (turfId) {
      //upload Exterior Design
      const exteriorImage = req.files.exterior;

      if (exteriorImage) {
        for (var i = 0; i < exteriorImage.length; i++) {
          const exteriorImageName = exteriorImage[i].originalname;
          if (exteriorImageName) {
            const exteriorImageData = {
              media_file: `${exteriorImageName}`,
              media_path: `${"storage/exterior/"}${exteriorImage[i].filename}`,
              media_type: 2, //media type table used 2 for exterior
              truf_id: turfId.rows[0].id,
            };

            await sharp(exteriorImageData.media_path)
              .webp({ quality: 20 })
              .toFile(exteriorImage[i].filename);

            const ExteriorId = await db.query(
              "Insert into turf_media(media_path,media_type,turf_id) VALUES($1,$2,$3) RETURNING *",
              [
                exteriorImageData.media_path,
                exteriorImageData.media_type,
                exteriorImageData.truf_id,
              ]
            );
          }
        }
      }

      //Branding Image
      const brandingImage = req.files.branding;
      if (brandingImage) {
        for (const j = 0; j < brandingImage.length; j++) {
          const brandingImageName = brandingImage[j].originalname;
          if (brandingImageName) {
            const brandingImageData = {
              media_file: `${brandingImageName}`,
              media_path: `${"storage/branding/"}-${brandingImage[j].filename}`,
              media_type: 3,
              turf_id: turfId.rows[0].id,
            };

            const brandingImageId = await db.query(
              "Insert into turf_media(media_path,media_type,turf_id) values ($1,$2,$3) RETURNING *",
              [
                brandingImageData.media_path,
                brandingImageData.media_type,
                brandingImageData.turf_id,
              ]
            );
          }
        }
      }

      //Interior Image
      const InteriorImage = req.files.interior;
      if (InteriorImage) {
        for (const k = 0; k < InteriorImage.length; k++) {
          const interiorImg = InteriorImage[k].originalname;

          if (interiorImg) {
            const interiorData = {
              media_file: `${interiorImg}`,
              media_path: `${"storage/interior/"}-${InteriorImage[k].filename}`,
              media_type: 2,
              turf_id: turfId.rows[0].id,
            };
          }

          const interiorQuery = await db.query(
            "insert into turf_media(media_path,media_type,turf_id) values($1,$2,$3)",
            [
              interiorData.media_path,
              interiorData.media_type,
              interiorData.turf_id,
            ]
          );
        }
      }

      //Pamphlet Image
      const PamphletImage = req.files.pamphlet;
      if (PamphletImage) {
        for (const p = 0; p < PamphletImage.length; p++) {
          const pamphletImg = PamphletImage[p].originalname;
          if (pamphletImg) {
            const pamphletData = {
              media_file: `${pamphletImg}`,
              media_path: `${"storage/pamphlet/"}-${PamphletImage[p].filename}`,
              media_type: 4,
              turf_id: turfId.rows[0].id,
            };
          }

          const pamphletId = await db.query(
            "Insert Into turf_media(media_path,media_type,turf_id) Values($1,$2,$3)",
            [
              pamphletData.media_path,
              pamphletData.media_type,
              pamphletData.turf_id,
            ]
          );
        }
      }

      res.status(200).json({ message: "Turf saved successfully" });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//update truf entry
module.exports.update_turf = async (req, res) => {
  try {
    const {
      id,
      turf_name,
      turf_size,
      address,
      contact_no_1,
      contact_no_2,
      contact_no_3,
      city,
      pincode,
      latitude,
      longitude,
      status,
      opening_time,
      closing_time,
      players,
      sports,
      amenities,
      price_chart,
    } = req.body;

    //console.log("req", req.body);
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return res.status(409).json({ errors: errors.array() });
    // }

    const turfId = await db.query(
      "Update turfs(turf_name,turf_size,address,contact_no_1,contact_no_2,contact_no_3,city,pincode,latitude,longitude,status,opening_time,closing_time,players,sports,amenities,price_chart) SET ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) WHERE id = $18",
      [
        turf_name,
        turf_size,
        address,
        contact_no_1,
        contact_no_2,
        contact_no_3,
        city,
        pincode,
        latitude,
        longitude,
        status,
        opening_time,
        closing_time,
        players,
        sports,
        amenities,
        price_chart,
        id,
      ]
    );

    if (id) {
      //upload Exterior Design
      const exteriorImage = req.files.exterior;

      if (exteriorImage) {
        for (var i = 0; i < exteriorImage.length; i++) {
          const exteriorImageName = exteriorImage[i].originalname;
          if (exteriorImageName) {
            const exteriorImageData = {
              media_file: `${exteriorImageName}`,
              media_path: `${"storage/exterior/"}${exteriorImage[i].filename}`,
              media_type: 2, //media type table used 2 for exterior
              truf_id: turfId.rows[0].id,
            };

            const ExteriorId = await db.query(
              "Update turf_media SET media_path=$1,media_type=2 Where turf_id = $3",
              [
                exteriorImageData.media_path,
                exteriorImageData.media_type,
                exteriorImageData.id,
              ]
            );
          }
        }
      }

      //Branding Image
      const brandingImage = req.files.branding;
      if (brandingImage) {
        for (const j = 0; j < brandingImage.length; j++) {
          const brandingImageName = brandingImage[j].originalname;
          if (brandingImageName) {
            const brandingImageData = {
              media_file: `${brandingImageName}`,
              media_path: `${"storage/branding/"}-${brandingImage[j].filename}`,
              media_type: 3,
              turf_id: turfId.rows[0].id,
            };

            const brandingImageId = await db.query(
              "update turf_media SET media_path=$1,media_type=$2 Where turf_id=$3",
              [
                brandingImageData.media_path,
                brandingImageData.media_type,
                brandingImageData.turf_id,
              ]
            );
          }
        }
      }

      //Interior Image
      const InteriorImage = req.files.interior;
      if (InteriorImage) {
        for (const k = 0; k < InteriorImage.length; k++) {
          const interiorImg = InteriorImage[k].originalname;

          if (interiorImg) {
            const interiorData = {
              media_file: `${interiorImg}`,
              media_path: `${"storage/interior/"}-${InteriorImage[k].filename}`,
              media_type: 2,
              turf_id: turfId.rows[0].id,
            };
          }

          const interiorQuery = await db.query(
            "update turf_media SET media_path=$1,media_type=$2 where turf_id = $3",
            [
              interiorData.media_path,
              interiorData.media_type,
              interiorData.turf_id,
            ]
          );
        }
      }

      //Pamphlet Image
      const PamphletImage = req.files.pamphlet;
      if (PamphletImage) {
        for (const p = 0; p < PamphletImage.length; p++) {
          const pamphletImg = PamphletImage[p].originalname;
          if (pamphletImg) {
            const pamphletData = {
              media_file: `${pamphletImg}`,
              media_path: `${"storage/pamphlet/"}-${PamphletImage[p].filename}`,
              media_type: 4,
              turf_id: turfId.rows[0].id,
            };
          }

          const pamphletId = await db.query(
            "update turf_media SET media_path=$1,media_type=$2 where turf_id = $3",
            [
              pamphletData.media_path,
              pamphletData.media_type,
              pamphletData.turf_id,
            ]
          );
        }
      }

      res.status(200).json({ message: "Turf Updated successfully" });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
