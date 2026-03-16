const vendorProfile = require('../service/vendorServices');
const HTTP_STATUS = require('../constants/statusCodes');
const sendResponse = require('../utils/response');
const user = require('../model/user');

const createVendorProfile = async (req, res) => {
	console.log('JWT role:', req.user.role);
	if (req.user.role !== 'VENDOR') {
		return sendResponse({
			res, 
			statusCode: HTTP_STATUS.FORBIDDEN,
			message: 'Only vendors can create vendor profile',
		});
	}
	const data = {
		user: req.user._id || req.user.id,
		profile: req.body.profile,
	};
	const vendor = await vendorProfile.createVendorProfile(data);
	return sendResponse({
		res, 
		statusCode: HTTP_STATUS.CREATED, 
		data: vendor
	});
};

const clientList = async (req, res) => {
	const vendorId = req.user._id || req.user.id;
	const clients = await vendorProfile.clientListService(vendorId);
	const cleanedClients = clients.map((c) => ({
		profile: c.profile, 
		wedding: c.wedding,
	}));
	return sendResponse({
		res,
		statusCode: HTTP_STATUS.OK,
		message: 'Matched clients fetched',
		data: {
			clients: cleanedClients
		},
	});
};

module.exports = {
	createVendorProfile,
	clientList,
};
