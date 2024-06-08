const express = require('express');
const router = express.Router();
const productionController = require('../controller/productionCount');

router.get('/production-count/:username/:date', productionController.getproductionCount);

module.exports = router;
