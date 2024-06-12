const Production = require('../model/productionCount');

module.exports = {
  getproductionCount: async (req, res) => {
    try {
      const { username, date } = req.params;

      const queryDate = new Date(date);
      const startOfDay = new Date(queryDate.setUTCHours(0, 0, 0, 0));
      const endOfDay = new Date(queryDate.setUTCHours(23, 59, 59, 999));

      const production = await Production.findOne({ 
        username, 
        date: { $gte: startOfDay, $lte: endOfDay } 
      });

      if (production) {
        res.status(200).json({ productionCount: production.productionCount });
      } else {
        res.status(404).json({ message: 'No production found for the specified date' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch production count' });
    }
  }
};
