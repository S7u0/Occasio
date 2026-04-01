const jwt = require('jsonwebtoken');
const sendResponse = require('../utils/response');
const HTTP_STATUS = require('../constants/statusCodes');

const isAuth = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.UNAUTHORIZED,
				message: 'Authentication required'
			});
		}

		const token = authHeader.split(' ')[1];

		const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

		if (!decoded?.id) {
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.UNAUTHORIZED,
				message: 'Invalid token'
			});
		}

		req.user = {
			id: decoded.id,
			role: decoded.role,
		};

		next();
	} catch (err) {
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.UNAUTHORIZED,
			message: 'Authentication failed'
		});
	}
};

module.exports = { isAuth };
