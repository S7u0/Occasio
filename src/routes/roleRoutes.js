const express = require('express');
const router = express.Router();
const roleController = require('../controller/roleController');
const wrapAsync = require('../utils/wrapAsync');

router.post('/create', wrapAsync(roleController.createRole));

module.exports = router;