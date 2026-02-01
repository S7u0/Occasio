const roleService = require('../service/roleServices');

const createRole = async (req, res) => {
	try {
		const role = await roleService.createRole(req.body);
		res.status(201).json(role);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	createRole,
};
