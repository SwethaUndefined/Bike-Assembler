const mongoose = require("mongoose");

const selectedBikeSchema = new mongoose.Schema({
  bikeName: {
    type: String,
  },
  cc: {
    type: Number,
  },
  model: {
    type: String,
  },
  thumbnail: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  modified_at: {
    type: Date,
    default: Date.now,
  },
  assembleTime: String,
  status: {
    type: String,
    default: "Yet to start",
  },
  progress: {
    type: Number,
    default: 0,
  },
  duration: {
    type: String,
    default: 0,
  },
});

const selectedBikeListSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  selectedBikes: [selectedBikeSchema],
});

const selectedBike = mongoose.model("selectedBikeList", selectedBikeListSchema);

module.exports = selectedBike;
