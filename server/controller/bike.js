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

  getBikeById: async (req, res) => {
    try {
      const id = req.params.bike_id; 
      const bike = await Bike.findOne({ id: id });    
      if (!bike) {
        return res.status(404).json({ success: false, error: 'Bike not found' });
      }
      res.status(200).json({ success: true, bike });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  },
  
};
