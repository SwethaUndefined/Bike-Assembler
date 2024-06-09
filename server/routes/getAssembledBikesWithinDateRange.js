const express = require('express');
const router = express.Router();
const { getAssembledBikesWithinDateRange } = require('../controller/getAssembledBikesWithinDateRange');

router.get('/assembled-bikes', getAssembledBikesWithinDateRange);

module.exports = router;
