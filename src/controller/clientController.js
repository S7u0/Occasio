const sendResponse = require('../utils/response');
const HTTP_STATUS = require('../constants/statusCodes');
const { profileUser, weddingInfoUser, vendorListService } = require('../service/clientServices');

const profile = async (req, res) => {
	if (req.user.role.name !== 'CLIENT') {
		return sendResponse(res, HTTP_STATUS.FORBIDDEN, {
			message: 'Only clients can update their profile',
		});
	}
	const data = {
		user: req.user.id,
		profile: req.body.profile,
	};
	console.log(data);

	const result = await profileUser(data);
	res.status(200).json(result);
};

const weddingInfo = async (req, res) => {
	const userId = req.user._id || req.user.id;

	await weddingInfoUser(userId, req.body);

	return sendResponse(res, HTTP_STATUS.OK, 'Wedding info updated successfully');
};

const vendorList = async (req, res) => {
	const userId = req.user._id || req.user.id;
	const vendors = await vendorListService(userId);
	const cleanedVendors = vendors.map((v) => ({
	profile: v.profile,
}));	
	res.status(200).json({
		message: 'Matched vendors fetched',
		vendors: cleanedVendors,
	});	
};

module.exports = {
	profile,
	weddingInfo,
	vendorList,
};
