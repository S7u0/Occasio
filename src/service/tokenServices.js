const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES || '15m';
const REFRESH_EXPIRES_DAYS = process.env.JWT_REFRESH_EXPIRES_DAYS || 7;

const generateAccessToken = (payload) => {
    // console.log(payload);
	return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
		expiresIn: ACCESS_EXPIRES,
	});
};

const generateRefreshToken = () => {
	const refreshToken = crypto.randomBytes(32).toString('hex');

	const hashedToken = crypto
		.createHash('sha256')
		.update(refreshToken)
		.digest('hex');

	const expiresAt = Date.now() + REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000;

	return { refreshToken, hashedToken, expiresAt };
};

const generateAuthTokens = (user) => {
	const accessToken = generateAccessToken({
		id: user._id,
		role: user.role.name,
	});

	const { refreshToken, hashedToken, expiresAt } = generateRefreshToken();

	return { accessToken, refreshToken, hashedToken, expiresAt };
};

module.exports = {
	generateAuthTokens,
    generateAccessToken,
    generateRefreshToken,
};