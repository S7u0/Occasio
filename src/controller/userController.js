const sendResponse = require('../utils/response');
const HTTP_STATUS = require('../constants/statusCodes');

const {
	registerUser,
	loginUser,
	profileUser,
	weddingInfoUser,
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

const profile = async (req, res) => {
	await profileUser(req.user.id, req.body);
	console.log(req.user.id);
	return sendResponse(res, HTTP_STATUS.OK, 'Profile Updated');
};

const weddingInfo = async (req, res) => {
	await weddingInfoUser(req.user.id, req.body);
	return sendResponse(res, HTTP_STATUS.OK, 'WeddingInfo Updated');
};

module.exports = {
	register,
	login,
	view,
	profile,
	weddingInfo,
};
