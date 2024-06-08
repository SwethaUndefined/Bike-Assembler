const Production = require('../model/productionCount');

module.exports = {
  getproductionCount: async (req, res) => {
    try {
      const { username, date } = req.params;
      const queryDate = new Date(date);

      const production = await Production.findOne({ username, date: queryDate });

      if (production) {
        res.status(200).json({ productionCount: production.productionCount });
      } else {
        res.status(404).json({ message: 'No production found for the specified date' });
      }
    } catch (error) {
      console.error('Error fetching production count:', error);
      res.status(500).json({ error: 'Failed to fetch production count' });
    }
  }
};
