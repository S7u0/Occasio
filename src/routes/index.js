const express = require('express');
const router = express.Router();

const roleRoutes = require('./roleRoutes');
const userRoutes = require('./userRoutes');
const paymentRoutes = require('./permissionRoutes');
const venueRoutes = require('./venueRoutes');

router.use('/role', roleRoutes);
router.use('/user', userRoutes);
router.use('/payment', paymentRoutes);
router.use('/venuePreference', venueRoutes);

module.exports = router;
