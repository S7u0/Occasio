const express = require('express');
const router = express.Router();
const clientController = require('../controller/clientController');
const { isAuth } = require('../middleware/authenticate');
const validateBody = require('../middleware/validateBody');
const wrapAsync = require('../utils/wrapAsync');
const {
    profileSchema,
    weddingSchema
} = require('../utils/schema');



router.post(
	'/profile',
	validateBody(profileSchema),
	isAuth,
	wrapAsync(clientController.profile)
);

router.post(
	'/weddingInfo',
	validateBody(weddingSchema),
	isAuth,
	wrapAsync(clientController.weddingInfo)
);

router.get(
	'/vendorlist',
	isAuth,
	wrapAsync(clientController.vendorList)
)

module.exports = router;