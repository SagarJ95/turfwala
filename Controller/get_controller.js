const db = require("../db/database");
const moment = require("moment");

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
