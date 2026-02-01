const dotenv = require('dotenv');
dotenv.config();

const User = require('../model/user');
const { Role } = require('../model/role');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const HTTP_STATUS = require('../constants/statusCodes');
const mongoose = require('mongoose');

const registerUser = async (data) => {
	const { username, email, phone, password, role } = data;
	console.log('🧠 DB NAME:', mongoose.connection.name);
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
		.select('+password') // 🔑 THIS FIX
		.populate('role');
	console.log('AFTER FIND role:', user.role, typeof user.role);

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

	const accessToken = jwt.sign(
		{ id: user._id },
		process.env.JWT_ACCESS_SECRET,
		{ expiresIn: '15m' },
	);

	const refreshToken = crypto.randomBytes(32).toString('hex');
	const hashedToken = crypto
		.createHash('sha256')
		.update(refreshToken)
		.digest('hex');
	user.refreshToken = hashedToken;
	user.refreshTokenExpires = Date.now() + 7 * 24 * 60 * 60 * 1000;
	console.log('BEFORE SAVE role:', user.role, typeof user.role);
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

const profileUser = async (userId, data) => {
	const user = await User.findById(userId);
	if (!user) throw new Error('User not found');

	user.username = data.username;
	user.email = data.email;
	user.phone = data.phone;
	user.profile = data.profile;

	await user.save();
	return user;
};

const weddingInfoUser = async (userId, weddingData) => {
	const user = await User.findById(userId);
	if (!user) {
		throw new Error('User not found');
	}
	user.wedding = weddingData.wedding;
	console.log(user.wedding);
	await user.save();
	return user.wedding;
};

module.exports = {
	registerUser,
	loginUser,
	viewUser,
	profileUser,
	weddingInfoUser,
};
