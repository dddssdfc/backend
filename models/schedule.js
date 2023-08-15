const mongoose = require("mongoose");

const Schedule = new mongoose.Schema({
  location: { type: Object },
  user_id: { type: String },
  schedule_date: { type: Date },
  categories: { type: Array },
  quantity: { type: Number },
  date: { type: Date, default: new Date() },
  confirmed: { type: Boolean, default: false },
  pending: { type: Boolean, default: true },
});

module.exports = mongoose.model("schedule", Schedule);
