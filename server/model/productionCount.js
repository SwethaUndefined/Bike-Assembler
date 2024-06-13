const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  productionCount: {
    type: Number,
    required: true,
    default: 0
  }
});

const Production = mongoose.model('Production', productionSchema);

module.exports = Production;
