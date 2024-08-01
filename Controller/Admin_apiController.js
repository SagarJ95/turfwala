const express = require("express");
const db = require("../db/database");

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
    }
  } catch (e) {
    res.status(400).json({ error: e.error() });
  }
};
