const sendResponse = require('../../utils/response.js');
const HTTP_STATUS = require('../../constants/statusCodes');
const {
	createVenue,
	viewVenues,
	viewVenueDetails,
	updateVenue,
	deleteVenue,
} = require('../../service/admin/adminVenueServices.js');

const createVenueController = async (req, res) => {
    const data = req.body;
    const createdBy = req.user.id;
    data.createdBy = createdBy;
    const venue = await createVenue(data);
    return sendResponse(res, HTTP_STATUS.CREATED, message = 'Venue created successfully', venue);
};

const viewVenuesController = async (req, res) => {
    const venues = await viewVenues();
    return sendResponse(res, HTTP_STATUS.OK, venues);
};

const viewVenueDetailsController = async (req, res) => {
    const venueId = req.params.id;
    const venue = await viewVenueDetails(venueId);
    if (!venue) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, 'Venue not found');
    }
    const cleanedVenue = {
        name: venue.name,
        code: venue.code,
    };
    return sendResponse(res, HTTP_STATUS.OK, cleanedVenue);
};

const updateVenueController = async (req, res) => {
    const venueId = req.params.id;
    if (!venueId) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, 'Venue not found');
    }
    const data = req.body;
    const updatedBy = req.user.id;
    data.updatedBy = updatedBy;
    const updatedVenue = await updateVenue(venueId, data);
    return sendResponse(res, HTTP_STATUS.OK, updatedVenue);
};

const deleteVenueController = async (req, res) => {
    const venueId = req.params.id;
    if (!venueId) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, 'Venue not found');
    }
    const data = req.user;
    data.deletedBy = req.user.id;
    const deletedVenue = await deleteVenue(venueId, data);
    return sendResponse(res, HTTP_STATUS.OK, deletedVenue);
};

module.exports = {
    createVenueController,
    viewVenuesController,
    viewVenueDetailsController,
    updateVenueController,
    deleteVenueController,
};