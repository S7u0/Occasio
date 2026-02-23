const vendorProfile = require('../service/vendorServices');
const HTTP_STATUS = require('../constants/statusCodes');
const sendResponse = require('../utils/response');
const user = require('../model/user');

const createVendorProfile = async (req, res) => {
	console.log('JWT role:', req.user.role.name);
	if (req.user.role.name !== 'VENDOR') {
		return sendResponse(res, HTTP_STATUS.FORBIDDEN, {
			message: 'Only vendors can create vendor profile',
		});
	}
	const data = {
		user: req.user._id || req.user.id,
		profile: req.body.profile,
	};
	const vendor = await vendorProfile.createVendorProfile(data);
	return sendResponse(res, HTTP_STATUS.CREATED, vendor);
};

const clientList = async (req, res) => {
	const vendorId = req.user._id || req.user.id;
	const clients = await vendorProfile.clientListService(vendorId);
	const cleanedClients = clients.map((c) => ({
		profile: c.profile, 
		wedding: c.wedding,
	}));
	res.status(200).json({
		message: 'Matched clients fetched',
		clients: cleanedClients,
	});
};

module.exports = {
	createVendorProfile,
	clientList,
};
