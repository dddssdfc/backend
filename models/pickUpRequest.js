const mongoose = require("mongoose");

const PickUpRequest = new mongoose.Schema({
  user_id: { type: String },
  location: { type: Object },
  categories: { type: Array },
  quantity: { type: Number },
  date: { type: Date, default: new Date() },
  confirmed: { type: Boolean, default: false },
  pending: { type: Boolean, default: true },
});

module.exports = mongoose.model("pickup_requests", PickUpRequest);
