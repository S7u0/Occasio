const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { isAuth } = require('../middleware/authenticate');
const validateBody = require('../middleware/validateBody');
const wrapAsync = require('../utils/wrapAsync');
const {
	registerSchema,
	loginSchema,
	profileSchema,
	weddingSchema
} = require('../utils/schema');


router.post(
	'/register',
	validateBody(registerSchema),
	wrapAsync(userController.register)
);

router.post(
	'/login',
	validateBody(loginSchema),
	wrapAsync(userController.login)
);

router.post(
	'/profile',
	validateBody(profileSchema),
	isAuth,
	wrapAsync(userController.profile)
);

router.post(
	'/weddingInfo',
	validateBody(weddingSchema),
	isAuth,
	wrapAsync(userController.weddingInfo)
);

router.get('/view', userController.view); 

module.exports = router;
