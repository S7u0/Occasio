const roleService = require('../service/roleServices');

const createRole = async (req, res) => {
		const role = await roleService.createRole(req.body);
		res.status(201).json(role);
};

module.exports = {
	createRole,
};
