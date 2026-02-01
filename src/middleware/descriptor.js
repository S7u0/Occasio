const descriptor = (key, description) => {
	const middleware = (req, res, next) => {
		req.permission = key;
		next();
	};

	middleware.permission = {
		key,
		description,
	};

	return middleware;
};

module.exports = { descriptor };
