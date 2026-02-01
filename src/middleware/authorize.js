module.exports = (permissionCode) => {
	return (req, res, next) => {
		const role = req.user.role;
		console.log(role);
		if (role.name === 'admin') return next();

		if (!role.permissions.includes(permissionCode)) {
			return res.status(403).json({ message: 'Permission denied' });
		}

		next();
	};
};
