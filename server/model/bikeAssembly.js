const mongoose = require('mongoose');

const BikeAssemblySchema = new mongoose.Schema({
  assemblyDate: {
    type: String,
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
});

const BikeAssembly = mongoose.model('BikeAssembly', BikeAssemblySchema);

module.exports = BikeAssembly;
