const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: () => {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      return currentDate;
    }
  },
  productionCount: {
    type: Number,
    required: true,
    default: 0
  }
});

const Production = mongoose.model('Production', productionSchema);

module.exports = Production;
