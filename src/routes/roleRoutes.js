const express = require('express');
const router = express.Router();
const roleController = require('../controller/roleController');

router.post('/create', roleController.createRole);

module.exports = router;
