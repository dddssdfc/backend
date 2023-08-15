const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const user = require("../models/user");

router.post("/", async (req, res) => {
  await User.findOne({ email: req.body.email })
    .then(async (user) => {
      if (user) {
        await bcrypt
          .compare(req.body.password, user.password)
          .then((validPassword) => {
            if (validPassword) {
              res.json({ user });
            } else {
              res.json({ message: "Invalid Password!" });
            }
          });
      } else {
        res.json({ message: "Invalid Email!" });
      }
    })
    .catch((err) => {
      res.json({ message: "Unknown Error occured!" });
    });
});

module.exports = router;
