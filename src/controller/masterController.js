const sendResponse = require('../utils/response');
const HTTP_STATUS = require('../constants/statusCodes');
const {
    getEventService,
    getVenueService,
    getServiceService,
    getCityService,
    getStateService,
    getCountryService,
} = require('../service/masterServices');

const getEvent = async (req, res) => {
    const { parentId, search } = req.query;
    const events = await getEventService(parentId, search);
    return sendResponse({
        res,
        statusCode: HTTP_STATUS.OK,
        message: 'Events fetched successfully',
        data: events,
    });
};

const getVenue = async (req, res) => {
	const venues = await getVenueService();
	return sendResponse({
		res,
		statusCode: HTTP_STATUS.OK,
		message: 'Venues fetched successfully',
		data: venues,
	});
};

const getService = async (req, res) => {
	const services = await getServiceService();
	return sendResponse({
		res,
		statusCode: HTTP_STATUS.OK,
		message: 'Services fetched successfully',
		data: services,
	});
};

const getCity = async (req, res) => {
    const { stateId, countryId, search } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
	const cities = await getCityService(stateId, countryId, page, limit, search);
    const cleanedCities = cities.cities.map((c) => ({
        id: c._id,
        name: c.name,
        code: c.code,
    }));
	return sendResponse({
		res,
		statusCode: HTTP_STATUS.OK,
		message: 'Cities fetched successfully',
		data: {
			cities: cleanedCities,
            pagination: cities.paginations,
		}
	});
};

const getState = async (req, res) => {
    const { countryId } = req.query;
	const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const states = await getStateService(countryId, page, limit);
    const cleanedStates = states.states.map((s) => ({
        id: s._id,
        name: s.name,
        code: s.code,
    }));
	return sendResponse({
		res,
		statusCode: HTTP_STATUS.OK,
		message: 'States fetched successfully',
		data: {
			states: cleanedStates,
			pagination: states.paginations,
		}
	});
};

const getCountry = async (req, res) => {
    const country = await getCountryService();
	return sendResponse({
		res,
		statusCode: HTTP_STATUS.OK,
		message: 'Countries fetched successfully',
		data: country,
	});
};

module.exports = {
    getEvent,
    getVenue,
    getService,
    getCity,
    getState,
    getCountry
}
