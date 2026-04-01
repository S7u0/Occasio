const HTTP_STATUS = require('../constants/statusCodes');
const roleService = require('../service/roleServices');
const sendResponse = require('../utils/response');

const createRole = async (req, res) => {
		const role = await roleService.createRole(req.body);
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.CREATED,
			message: 'Role Created Successfully',
			data: role
		});
};

module.exports = {
	createRole,
};
