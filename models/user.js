const mongoose = require("mongoose");
const User = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  phone_number: { type: String },
  password: { type: String },
  user_role: { type: String, default: "client" },
  verified: { type: Boolean, default: false },
  address: { type: Object },
});

module.exports = mongoose.model("user", User);
