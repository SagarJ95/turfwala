const express = require("express");
const db = require("../db/database");
const { validationResult } = require("express-validator");
const sharp = require("sharp");

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

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(409).json({ errors: errors.array() });
    }

    const turfId = await db.query(
      "Insert into turfs(turf_name,turf_size,address,contact_no_1,contact_no_2,contact_no_3,city,pincode,latitude,longitude,status,opening_time,closing_time,players,sports,amenities,price_chart) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) RETURNING *",
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
      const { buffer, exteriorImage } = req.files.exterior;

      if (exteriorImage) {
        for (var i = 0; i < exteriorImage.length; i++) {
          const exteriorImageName = exteriorImage[i].originalname;

          if (exteriorImageName) {
            const exteriorImageData = {
              media_file: `${exteriorImage[i].originalname}.webp`,
              media_path: `${"exterior/"}${exteriorImageName}.webp`,
              media_type: 2, //media type table used 2 for exterior
              truf_id: turfId.row[0].id,
              created_by: Date.now(),
            };

            await sharp(buffer)
              .webp({ quality: 20 })
              .toFile("storage/exterior/" + exteriorImageData.media_file);

            const ExteriorId = await db.query(
              "Insert into turf_media(media_path,media_type,truf_id) VALUES(media_path,media_type,truf_id) RETURNING *",
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
      // const brandingImage = req.files.branding;
      // if (brandingImage) {
      //   for (const j = 0; j < brandingImage.length; j++) {
      //     const brandingImageName = brandingImage[j].filename;
      //     if (brandingImageName) {
      //       const brandingImageData = {
      //         media_path: "branding/" + brandingImageName,
      //         media_type: 3,
      //         turf_id: turfId.row[0].id,
      //       };

      //       const brandingImageId = await db.query(
      //         "Insert into turf_media(media_path,media_type,turf_id) values (?,?,?) RETURNING *",
      //         [
      //           brandingImageData.media_path,
      //           brandingImageData.media_type,
      //           brandingImageData.turf_id,
      //         ]
      //       );
      //     }
      //   }
      // }

      // Interior Image
      // const InteriorImage = req.files.interior;
      // if (InteriorImage) {
      //   for (const k = 0; k < InteriorImage.length; k++) {
      //     const interiorImg = InteriorImage[k].filename;

      //     if (interiorImg) {
      //       const interiorData = {
      //         media_path: "interior/" + interiorImg,
      //         media_type: 2,
      //         turf_id: turfId.row[0].id,
      //       };
      //     }

      //     const interiorQuery = await db.query(
      //       "insert into turf_media(media_path,media_type,turf_id) values(?,?,?)",
      //       [
      //         interiorData.media_path,
      //         interiorData.media_type,
      //         interiorData.turf_id,
      //       ]
      //     );
      //   }
      // }

      //Pamphlet Image
      // const PamphletImage = req.files.pamphlet;
      // if (PamphletImage) {
      //   for (const p = 0; p < PamphletImage.length; p++) {
      //     const pamphletImg = PamphletImage[p].filename;
      //     if (pamphletImg) {
      //       const pamphletData = {
      //         media_path: "pamphlet/" + pamphletImg,
      //         media_type: 4,
      //         turf_id: turfId.row[0].id,
      //       };
      //     }

      //     const pamphletId = await db.query(
      //       "Insert Into turf_media(media_path,media_type,turf_id) Values(?,?,?)",
      //       [
      //         pamphletData.media_path,
      //         pamphletData.media_type,
      //         pamphletData.turf_id,
      //       ]
      //     );
      //   }
      // }

      res.status(200).json({ message: "Turf saved successfully" });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
