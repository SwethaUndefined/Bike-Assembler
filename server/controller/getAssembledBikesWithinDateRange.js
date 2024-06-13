const BikeAssembly = require('../model/bikeAssembly');

const getAssembledBikesWithinDateRange = async (req, res) => {
    try {
        const { fromDate, toDate } = req.query;
        const assembledBikes = await BikeAssembly.find({
            assemblyDate: {
                $gte: fromDate, 
                $lte: toDate
            }
        });
        const assembledBikesCount = assembledBikes.length;

        res.status(200).json({ assembledBikesCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch assembled bikes' });
    }
};

module.exports = { getAssembledBikesWithinDateRange };

