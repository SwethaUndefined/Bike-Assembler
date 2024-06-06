const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.post('/', userController.login);

module.exports = router;
