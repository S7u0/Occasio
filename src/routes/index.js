const express = require('express');
const router = express.Router();

const roleRoutes = require('./roleRoutes');
const userRoutes = require('./userRoutes');
const adminEventRoutes = require('./admin/adminEventRoutes');
const adminVenueRoutes = require('./admin/adminVenueRoutes');
const adminServiceRoutes = require('./admin/adminServiceRoutes');
const adminDashboardRoutes = require('./admin/adminDashboardRoutes');
const vendorRoutes = require('./vendorRoutes');
const clientRoutes = require('./clientRoutes');

router.use('/role', roleRoutes);
router.use('/user', userRoutes);
router.use('/client', clientRoutes);
router.use('/admin', adminEventRoutes);
router.use('/admin', adminVenueRoutes);
router.use('/admin', adminServiceRoutes);
router.use('/admin', adminDashboardRoutes);
router.use('/vendor', vendorRoutes);

module.exports = router;