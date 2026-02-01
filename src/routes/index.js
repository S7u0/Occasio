const express = require('express');
const router = express.Router();

const roleRoutes = require('./roleRoutes');
const userRoutes = require('./userRoutes');
const paymentRoutes = require('./paymentRoutes');
const venueRoutes = require('./venueRoutes');

const withModule = (modulePath, router) => {
	router.__modulePath = modulePath;
	return router;
};

router.use('/role', roleRoutes);
router.use('/user', userRoutes);
router.use('/payment', paymentRoutes);
router.use('/venuePreference', venueRoutes);

module.exports = router;
