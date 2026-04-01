const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { isAuth } = require('../middleware/authenticate');
const validateRequest = require('../middleware/validateBody');
const wrapAsync = require('../utils/wrapAsync');
const {
	registerSchema,
	loginSchema,
} = require('../utils/schema');


router.post(
	'/register',
	validateRequest(registerSchema),
	wrapAsync(userController.register)
);

router.post(
	'/login',
	validateRequest(loginSchema),
	wrapAsync(userController.login)
);

router.get('/view', userController.view); 

module.exports = router;
