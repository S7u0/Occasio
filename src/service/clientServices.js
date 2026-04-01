const { client } = require('../model/clientProfile');
const { vendor } = require('../model/vendorProfile');
const mongoose = require('mongoose');

const profileUser = async ({ user, profile }) => {
	const clientProfile = await client.findOneAndUpdate(
		{ user },
		{ $set: { profile } },
		{
			new: true,
			upsert: true,
		},
	);
	return clientProfile;
};

const weddingInfoUser = async (userId, weddingData) => {
	const clientProfile = await client.findOne({ user: userId });
	if (!clientProfile) {
		throw new Error('Client profile not found');
	}
	clientProfile.wedding = weddingData.wedding;
	await clientProfile.save();
	return clientProfile.wedding;
};

const vendorListService = async (userId) => {
	const clientProfile = await client.findOne({
		user: new mongoose.Types.ObjectId(userId),
	});
	if (!clientProfile.profile || !clientProfile.wedding) {
		throw new Error('Please complete profile first');
	}
	const { eventPreferences, venuePreferences, servicePreferences } =
		clientProfile.wedding;
	return await vendor
		.find({
			'profile.eventPreferences': { $in: eventPreferences },
			'profile.venuePreferences': { $in: venuePreferences },
			'profile.servicePreferences.service': { $in: servicePreferences },
			isActive: true,
		})
		.populate('profile.eventPreferences', 'name code')
		.populate('profile.venuePreferences', 'name code')
		.populate('profile.servicePreferences', 'name code'); 
};

module.exports = {
	profileUser,
	weddingInfoUser,
	vendorListService,
};
