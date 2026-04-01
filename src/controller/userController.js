const sendResponse = require('../utils/response');
const HTTP_STATUS = require('../constants/statusCodes');

const {
	registerUser,
	loginUser,
} = require('../service/userServices');

const register = async (req, res) => {
	const register = await registerUser(req.body);
	console.log(req.body);
	return sendResponse({
		res, 
		statusCode: HTTP_STATUS.CREATED, 
		message: 'User registered successfully',
		data: register
	});
};

const login = async (req, res) => {
	const tokens = await loginUser(req.body);
	return sendResponse({
		res, 
		statusCode: HTTP_STATUS.OK, 
		message: 'Login successful', 
		data: tokens 
	});
};

const view = async (req, res) => {
	const user = await userService.viewUser(req.body);
	return sendResponse({
		res, 
		statusCode: HTTP_STATUS.OK, 
		message: 'User fetched successfully',
		data: user 
	});
};

module.exports = {
	register,
	login,
	view
};
