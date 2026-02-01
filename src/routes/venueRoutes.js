const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router();
const venueController = require('../controller/venueController');
const validateBody = require('../middleware/validateBody');
const { venueSchema } = require('../utils/schema');
const authorize = require('../middleware/authorize');
const { isAuth } = require('../middleware/authenticate');
const { descriptor } = require('../middleware/descriptor');

router.post(
	'/add',
	isAuth,
	validateBody(venueSchema),
	descriptor('venuePreference.add', 'Allow to add venue'),
	wrapAsync(venueController.addVenue),
);

router.get('/view', venueController.getVenue);

module.exports = router;