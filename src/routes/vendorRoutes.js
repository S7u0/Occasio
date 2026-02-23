const createVendorProfile = require('../controller/vendorController');
const express = require('express');
const validateBody = require('../middleware/validateBody');
const wrapAsync = require('../utils/wrapAsync');
const { isAuth } = require('../middleware/authenticate');
const router = express.Router();
const { 
    vendorProfileSchema 
} = require('../utils/schema');

router.post(
    '/profile', 
    validateBody(vendorProfileSchema),
    isAuth,
    wrapAsync(createVendorProfile.createVendorProfile)
);

router.get(
    '/clientlist',
    isAuth,
    wrapAsync(createVendorProfile.clientList)
);

module.exports = router;