
const express = require('express');
const router = express.Router();
const selectedBikeController = require('../controller/selectedBike');

router.get('/allBikes', selectedBikeController.getAllSelectedBikes);
router.post('/', selectedBikeController.submitSelectedBikes); 
router.get('/:username', selectedBikeController.getSelectedBikes); 
router.put('/:username/:bikeId', selectedBikeController.updateSelectedBike); 

module.exports = router;
