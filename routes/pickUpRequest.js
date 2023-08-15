const express = require("express");
const router = express.Router();
const Request = require("../models/pickUpRequest");
router.get("/", (req, res) => {
  res.send("Request picp up");
});

router.post("/", async (req, res) => {
  await Request.findOne({
    $and: [{ user_id: req.body.user_id }, { pending: true }],
  })
    .then(async (pending) => {
      if (pending) {
        res.json({
          message:
            "You have a pending pick up request, can't make another request!",
          success: false,
        });
      } else {
        const request = new Request(req.body);
        await request
          .save()
          .then(() => {
            res.json({
              message: "Your request has been submited",
              success: true,
            });
          })
          .catch((err) => {
            res.json({ message: "Uknown error occured!", success: false });
          });
      }
    })
    .catch((err) => {
      res.json({ message: "Uknown error occured!", success: false });
    });
});

//Fetch user Requests
router.get("/:id", async (req, res) => {
  await Request.find({ user_id: req.params.id })
    .then((requests) => {
      res.json(requests);
    })
    .catch((err) => {
      res.json({ message: "Unknown error occured!", success: false });
    });
});

module.exports = router;
