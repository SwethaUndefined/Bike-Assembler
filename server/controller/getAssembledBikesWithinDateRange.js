const BikeAssembly = require('../model/bikeAssembly');

const getAssembledBikesWithinDateRange = async (req, res) => {
    try {
        const { fromDate, toDate } = req.query; 
        const fromDateObj = new Date(fromDate);
        const toDateObj = new Date(toDate);
        toDateObj.setDate(toDateObj.getDate() + 1);

        const assembledBikes = await BikeAssembly.find({
            assemblyDate: {
                $gte: fromDateObj,
                $lt: toDateObj
            }
        });

        const assembledBikesCount = assembledBikes.length;

        res.status(200).json({ assembledBikesCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch assembled bikes' });
    }
};

module.exports = { getAssembledBikesWithinDateRange };
