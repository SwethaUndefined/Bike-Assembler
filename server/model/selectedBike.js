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
  startProgress: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
});

const selectedBikeListSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  productionCount: { type: Number, default: 0 },
  selectedBikes: [selectedBikeSchema],
});

const selectedBike = mongoose.model("selectedBikeList", selectedBikeListSchema);

module.exports = selectedBike;
