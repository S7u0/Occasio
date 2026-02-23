const sendResponse = require('../utils/response');
const HTTP_STATUS = require('../constants/statusCodes');

const {
	registerUser,
	loginUser,
} = require('../service/userServices');

const register = async (req, res) => {
	await registerUser(req.body);
	console.log(req.body);
	return sendResponse(res, HTTP_STATUS.CREATED, 'User registered successfully');
};

const login = async (req, res) => {
	const tokens = await loginUser(req.body);
	return sendResponse(res, HTTP_STATUS.OK, 'Login successful', tokens);
};

const view = async (req, res) => {
	const user = await userService.viewUser(req.body);
	res.json(user);
};

module.exports = {
	register,
	login,
	view
};
