const { vendor } = require('../model/vendorProfile');
const { client } = require('../model/clientProfile');
const mongoose = require('mongoose');

const createVendorProfile = async (data) => {
	console.log(data.profile);
	return vendor.findOneAndUpdate(
		{ user: data.user },
		{ $set: { profile: data.profile } },
		{ new: true, upsert: true },
	);
};

const clientListService = async (vendorId) => {
	const vendorProfile = await vendor.findOne({
		user: new mongoose.Types.ObjectId(vendorId),
	});
	if (!vendorProfile || !vendorProfile.profile) {
		throw new Error('Vendor profile not found');
	}
	const { eventPreferences, venuePreferences, servicePreferences } =
		vendorProfile.profile;

	const vendorServiceIds = servicePreferences.map((sp) => sp.service);
	return await client
		.find({
			$and: [
				{ 'wedding.servicePreferences': { $in: vendorServiceIds } },
				{ 'wedding.venuePreferences': { $in: venuePreferences } },
				{ 'wedding.eventPreferences': { $in: eventPreferences } },
			],
		// 	// 'wedding.eventPreferences': { $in: eventPreferences },
		// 	'wedding.venuePreferences': { $in: venuePreferences },
		// 	// 'wedding.servicePreferences': { $in: vendorServiceIds },
		})
		.populate('user', 'name email')
		.populate('wedding.eventPreferences', 'name code')
		.populate('wedding.venuePreferences', 'name code')
		.populate('wedding.servicePreferences', 'name code');
};

module.exports = {
	createVendorProfile,
	clientListService,
};
