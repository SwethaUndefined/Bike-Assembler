const Bike = require('../model/bike');

module.exports = {
  getAllBikes: async (req, res) => {
    try {
      const bikes = await Bike.find();
      res.status(200).json({ success: true, bikes });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  },
};
