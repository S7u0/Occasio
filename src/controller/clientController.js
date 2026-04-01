const sendResponse = require('../utils/response');
const HTTP_STATUS = require('../constants/statusCodes');
const {
	profileUser,
	weddingInfoUser,
	vendorListService
} = require('../service/clientServices');

const profile = async (req, res) => {
	if (req.user.role !== 'CLIENT') {
		return sendResponse({
			res, 
			statusCode: HTTP_STATUS.FORBIDDEN,
			message: 'Only clients can create their profile',
		});
	}
	const data = {
		user: req.user.id,
		profile: req.body.profile,
	};

	const result = await profileUser(data);
	return sendResponse({        
			res, 
			statusCode: HTTP_STATUS.OK, 
			message: 'Client Profile Created Successfully',
			data: result
		});
};

const weddingInfo = async (req, res) => {
	if (req.user.role !== 'CLIENT') {
		return sendResponse({
			res, 
			statusCode: HTTP_STATUS.FORBIDDEN,
			message: 'Only clients can update their wedding info',
		});
	}
	const userId = req.user._id || req.user.id;
	const wedding = await weddingInfoUser(userId, req.body);
	return sendResponse({
		res, 
		statusCode: HTTP_STATUS.OK, 
		message: 'Wedding info updated successfully',
		data: wedding
	});
};

const vendorList = async (req, res) => {
	if (req.user.role !== 'CLIENT') {
		return sendResponse({
			res, 
			statusCode: HTTP_STATUS.FORBIDDEN,
			message: 'Only clients can view the vendor list',
		});
	}
	const userId = req.user._id || req.user.id;
	const vendors = await vendorListService(userId);
	const cleanedVendors = vendors.map((v) => ({
		profile: v.profile,
	}));
	return sendResponse({
		res,
		statusCode: HTTP_STATUS.OK,
		message: 'Matched vendors fetched',
		data: {
			vendors: cleanedVendors
		},
	});
};

module.exports = {
	profile,
	weddingInfo,
	vendorList,
};
