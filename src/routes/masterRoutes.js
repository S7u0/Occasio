const express = require('express');
const router = express.Router();
const masterController = require('../controller/masterController');
const { isAuth } = require('../middleware/authenticate');
const wrapAsync = require('../utils/wrapAsync');
const validateRequest = require('../middleware/validateBody');
const { querySchema } = require('../utils/schema');


router.get(
	'/event',
	isAuth,
	wrapAsync(masterController.getEvent)
)

router.get(
	'/venue',
	isAuth,
	wrapAsync(masterController.getVenue)
)

router.get(
	'/service',
	isAuth,
	wrapAsync(masterController.getService)
)

router.get(
	'/city',
	isAuth,
    validateRequest(querySchema, 'query'),
	wrapAsync(masterController.getCity),
)

router.get(
	'/state',
	isAuth,
	wrapAsync(masterController.getState)
)

router.get(
	'/country',
	isAuth,
	wrapAsync(masterController.getCountry)
)

module.exports = router;