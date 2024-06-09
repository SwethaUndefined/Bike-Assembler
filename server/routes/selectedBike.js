
const express = require('express');
const router = express.Router();
const selectedBikeController = require('../controller/selectedBike');

router.post('/', selectedBikeController.submitSelectedBikes); 
router.get('/:username', selectedBikeController.getSelectedBikes); 
router.put('/:username/:bikeId', selectedBikeController.updateSelectedBike); 

module.exports = router;
