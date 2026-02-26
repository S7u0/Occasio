const mongoose = require('mongoose');
const { Schema } = mongoose;

const vendorSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			unique: true,
		},

		profile: {
			businessName: {
				type: String,
				required: true,
			},
			ownerName: {
				type: String,
				required: true,
			},
			address: {
				type: String,
			},
			service: {
				type: String,
			},
			yearsOfExperience: {
				type: Number,
			},
			description: {
				type: String,
			},
			photo: {
				type: String,
			},
			venuePreferences: [
				{
					type: mongoose.Types.ObjectId,
					ref: 'venue',
				},
			],

			customVenue: {
				type: String,
				trim: true,
				maxlength: 150,
			},

			eventPreferences: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Event',
				},
			],
			servicePreferences: [
				{
					_id: false,
					
					service: {
						type: Schema.Types.ObjectId,
						ref: 'Service', 
					},
					variants: [
						{
							type: Schema.Types.ObjectId,
							ref: 'Service', 
						},
					],
				},
			],
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

vendorSchema.index({ 'profile.eventPreferences': 1 });
vendorSchema.index({ 'profile.venuePreferences': 1 });
vendorSchema.index({ 'profile.servicePreferences.service': 1 });
vendorSchema.index({ isActive: 1 });

vendorSchema.pre(/^find/, function (next) {
	this.where({ deletedAt: null });
});

const vendor = mongoose.model('Vendor', vendorSchema);

module.exports = { vendor };