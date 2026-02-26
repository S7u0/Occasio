const dotenv = require('dotenv');
dotenv.config();

const User = require('../model/user');
const { Role } = require('../model/role');
const bcrypt = require('bcrypt');
const HTTP_STATUS = require('../constants/statusCodes');
const tokenService = require('../utils/tokenServices');

const registerUser = async (data) => {
	const { username, email, phone, password, role } = data;
	const roleDoc = await Role.findOne({
		name: role || 'USER',
	});
	if (!roleDoc) {
		throw new Error('Role not found');
	}
	return await User.create({
		username,
		email,
		phone,
		password,
		role: roleDoc._id,
	});
};

const loginUser = async ({ email, password }) => {
	const user = await User.findOne({ email })
		.select('+password')
		.populate('role');

	if (!user) {
		const err = new Error('Invalid credentials');
		err.statusCode = HTTP_STATUS.UNAUTHORIZED;
		throw err;
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		const err = new Error('Invalid credentials');
		err.statusCode = HTTP_STATUS.UNAUTHORIZED;
		throw err;
	}
	const { accessToken, refreshToken } = tokenService.generateAuthTokens(user);
	await user.save();

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
