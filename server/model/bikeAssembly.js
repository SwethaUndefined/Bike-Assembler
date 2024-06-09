const mongoose = require('mongoose');

const BikeAssemblySchema = new mongoose.Schema({
  assemblyDate: {
    type: Date,
    required: true,
  },
  bikeName: {
    type: String,
    required: true,
  },
  assembler: {
    type: String,
    required: true,
  },
  cc: {
    type: Number,
    required: true,
  },
});

const BikeAssembly = mongoose.model('BikeAssembly', BikeAssemblySchema);

module.exports = BikeAssembly;
