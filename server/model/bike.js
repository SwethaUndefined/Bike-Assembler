const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  bikeName: String,
  model: String,
  cc: Number,
  thumbnail: String,
  assembleDate: Date,
  assembleTime: String,
  created_dateAndTime: Date,
  status: { type: String, collation: { locale: 'en', strength: 2 } },
  modified_At : Date
});

const Bike = mongoose.model('Bike', bikeSchema);
module.exports = Bike;
