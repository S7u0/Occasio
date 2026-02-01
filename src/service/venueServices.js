const VenuePreference = require('../model/venuePreference');

const addVenuePreference = async ({ code, name, adminId }) => {
	const exists = await VenuePreference.findOne({ code });
	if (exists) {
		throw new Error('Venue preference already exists');
	}

	return VenuePreference.create({
		code,
		name,
		createdBy: adminId,
	});
};

const listVenue = async () => {
	return VenuePreference.find({ isActive: true })
		.select('code name')
		.sort({ name: 1 });
};

module.exports = {
	addVenuePreference,
	listVenue,
};
