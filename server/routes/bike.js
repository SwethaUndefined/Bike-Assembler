const express = require('express');
const router = express.Router();
const bikeController = require('../controller/bike');

router.get('/', bikeController.getAllBikes);

module.exports = router;
