const dotenv = require('dotenv');
dotenv.config();

const User = require('../model/user');
const { Role } = require('../model/role');
const HTTP_STATUS = require('../constants/statusCodes');
const tokenService = require('../utils/tokenServices');
const hashPassword = require('../utils/hashPassword');

const registerUser = async (data) => {
	const { username, email, phone, password, role } = data;
	const roleDoc = await Role.findOne({
		name: role || 'USER',
	});
	if (!roleDoc) {
		throw new Error('Role not found');
	}
	
	const hashedPassword = hashPassword(password);

	return await User.create({
		username,
		email,
		phone,
		password: hashedPassword,
		role: roleDoc._id,
	});
};

const loginUser = async ({ email, password }) => {
	console.time('start');
	const user = await User.findOne({ email })
		.select('+password')
		.populate('role');
		console.time('user found');
	if (!user) {
		const err = new Error('Invalid credentials');
		err.statusCode = HTTP_STATUS.UNAUTHORIZED;
		throw err;
	}

	console.time('password-compare');
	const hashedPassword = hashPassword(password);
	const isMatch = hashedPassword === user.password;
	
	if (!isMatch) {
		const err = new Error('Invalid credentials');
		err.statusCode = HTTP_STATUS.UNAUTHORIZED;
		throw err;
	}
	console.timeEnd('password-compare');

	const { accessToken, refreshToken } = tokenService.generateAuthTokens(user);
	console.time('tokens generated');
	await user.save();
	console.timeEnd('user saved');

	return { accessToken, refreshToken };
};

const viewUser = async (email) => {
	return await User.find(email).populate({
		path: 'role',
		populate: {
			path: 'permissions',
		},
	});
};
module.exports = {
	registerUser,
	loginUser,
	viewUser,
};
