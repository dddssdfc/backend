const express = require("express");
const router = express.Router();
const Schedule = require("../models/schedule");
const Request = require("../models/pickUpRequest");
router.get("/", (req, res) => {
  res.send("Scheduling");
});

router.post("/", async (req, res) => {
  await Schedule.findOne({
    $and: [{ user_id: req.body.user_id }, { pending: true }],
  }).then(async (pending_schedule) => {
    if (pending_schedule) {
      res.json({
        message: "You have a pending schedule, can't make another schedule!",
        success: false,
      });
    } else {
      const schedule = new Schedule(req.body);
      await schedule
        .save()
        .then(() => {
          res.json({
            message: "Schedule Completed",
            success: true,
          });
        })
        .catch((err) => {
          res.json({
            message: "Unknown error occured!",
            success: false,
          });
        });
    }
  });
});
//Fetch user Schedule
router.get("/:id", async (req, res) => {
  await Schedule.find({ user_id: req.params.id })
    .then((schedules) => {
      res.json(schedules);
    })
    .catch((err) => {
      res.json({ message: "Unknown error occured!", success: false });
    });
});

module.exports = router;
