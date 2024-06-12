const express = require('express');
const router = express.Router();
const userRoutes = require('./routes/user'); 
const bikeRoutes = require('./routes/bike')
const userController = require('./controller/user');
const selectedBike = require('./routes/selectedBike');
const productionRoutes = require('./routes/productionCount');
const assembledBikesRoutes = require('./routes/getAssembledBikesWithinDateRange');

router.use('/login', userRoutes); 
router.use('/bike',bikeRoutes)
router.post('/logout', userController.logout);
router.use('/selected-bike', selectedBike);
router.use('/production', productionRoutes);
router.use('/assembled', assembledBikesRoutes);

module.exports = router;

