const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

router.get("/", (req, res) => {
  res.send("Register Route");
});

router.post("/", async (req, res) => {
  await User.findOne({
    $or: [{ email: req.body.email }, { phone_number: req.body.phone_number }],
  }).then(async (user_exits) => {
    if (user_exits) {
      if (user_exits.email == req.body.email) {
        res.json({
          message: "User email is already registered!",
          success: false,
        });
      } else {
        res.json({
          message: "User phone number is already registered!",
          success: false,
        });
      }
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const user_data = req.body;
      user_data.password = hashPassword;
      const user = new User(user_data);
      user
        .save()
        .then(() => {
          res.json({
            message: "Your account has been created successfully",
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

module.exports = router;
