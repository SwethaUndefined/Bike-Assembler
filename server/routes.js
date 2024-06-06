const express = require('express');
const router = express.Router();
const userRoutes = require('./routes/user'); 
const bikeRoutes = require('./routes/bike')

router.use('/login', userRoutes); 
router.use('/bike',bikeRoutes)

module.exports = router;
