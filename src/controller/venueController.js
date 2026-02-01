const sendResponse = require('../utils/response');
const HTTP_STATUS = require('../constants/statusCodes');
const {
    addVenuePreference,
    listVenue
} = require('../service/venueServices');

const addVenue = async (req, res) => {
	const venue = await addVenuePreference({
		code: req.body.code,
		name: req.body.name,
		adminId: req.user.id,
	});

    return sendResponse(res, HTTP_STATUS.OK, venue);
};

const getVenue = async (req, res) => {
    const venues = await listVenue();
    return sendResponse(res, HTTP_STATUS.OK);
};

module.exports = {
    addVenue,
    getVenue
}