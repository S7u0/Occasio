const createVendorProfile = require('../controller/vendorController');
const express = require('express');
const validateBody = require('../middleware/validateBody');
const wrapAsync = require('../utils/wrapAsync');
const { isAuth } = require('../middleware/authenticate');
const router = express.Router();
const { 
    vendorSchema 
} = require('../utils/schema');

router.post(
    '/profile', 
    validateBody(vendorSchema),
    isAuth,
    wrapAsync(createVendorProfile.createVendorProfile)
);

router.get(
    '/clientlist',
    isAuth,
    wrapAsync(createVendorProfile.clientList)
);

module.exports = router;