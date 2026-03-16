const { Event } = require('../model/event');
const { venuePreference } = require('../model/venuePreference.js');
const { Service } = require('../model/servicePreference.js');
const { City } = require('../model/city');
const { State } = require('../model/state');
const { Country } = require('../model/country');
const { pagination } = require('../utils/pagination');

const escapeRegex = (text) => {
	return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const getEventService = async (parentId, search) => {
    
    if (!parentId) {
		const events = await Event.find({ parentEvent: null }).select('name code');
		return events;
	}
	const events = await Event.find({ parentEvent: parentId }).select(
		'name code',
	);
	return events;
};

const getVenueService = async () => {
	const venues = await venuePreference.find().select('name code');
	return venues;
};

const getServiceService = async () => {
	const services = await Service.find().select('name code');
	return services;
};

const getCityService = async (stateId, countryId, page, limit, search) => {
    const safeSearch = search ? escapeRegex(search) : null;
	const filter = { 
        ...stateId && { state: stateId },
        ...countryId && { country: countryId },
        ...search &&  { $or: [
            { name: { $regex: safeSearch, $options: 'i' } },
            { code: { $regex: safeSearch, $options: 'i' } },
        ] },
    };
	const cities = await City.find(filter)
		.select('name code country state')
		.skip((page - 1) * limit)
		.limit(limit);
	const totalRecords = await City.countDocuments(filter);
	const paginations = pagination(page, limit, totalRecords);
	return { cities, paginations };
};

const getStateService = async (countryId, page, limit) => {
	if (!countryId) {
		const states = await State.find().select('name code');
		return states;
	}
	const states = await State.find({ country: countryId })
		.select('name code country')
		.populate('country', 'name code')
		.skip((page - 1) * limit)
		.limit(limit);
	const totalRecords = await State.countDocuments({ country: countryId });
	const paginations = pagination(page, limit, totalRecords);
	return { states, paginations };
};

const getCountryService = async (countryId) => {
	const countries = await Country.find(countryId)
		.select('name code')
		.skip((page - 1) * limit)
		.limit(limit);
	const totalRecords = await Country.countDocuments(countryId);
	const paginations = pagination(page, limit, totalRecords);
	return { countries, paginations };
};

module.exports = {
	getEventService,
	getVenueService,
	getServiceService,
	getCityService,
	getStateService,
	getCountryService,
};
