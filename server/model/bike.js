// models/Bike.js
const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  name: String,
  assemblyTime: String,
  assembledAt: Date, // Date when the bike was assembled
  employeeId: mongoose.Schema.Types.ObjectId, // Reference to Employee
});

const Bike = mongoose.model('Bike', bikeSchema);
module.exports = Bike;
