const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			unique: true,
		},
		profile: {
			gender: {
				type: String,
				enum: ['MALE', 'FEMALE', 'OTHER'],
			},

			dateOfBirth: {
				type: Date,
			},

			language: {
				type: [String],
				default: ['EN'],
			},

			photo: {
				type: String,
				default: '',
			},

			location: {
				city: {
					type: Schema.Types.ObjectId,
					ref: 'City',
				},
				state: {
					type: Schema.Types.ObjectId,
					ref: 'State',
				},
				country: {
					type: Schema.Types.ObjectId,
					ref: 'Country',
				},
			},
		},

		wedding: {
			eventDate: {
				start: {
					type: Date,
				},
				end: {
					type: Date,
				},
			},

			budget: {
				type: Number,
			},

			guest: {
				type: Number,
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
					type: Schema.Types.ObjectId,
					ref: 'Service',
					required: true,
				},
			],
		},

		deletedAt: {
			type: Date,
		},

		isActive: {
			type: Boolean,
			default: true,
		},
	},

	{ timestamps: true },
);

clientSchema.index({ 'wedding.eventPreferences': 1 });
clientSchema.index({ 'wedding.venuePreferences': 1 });
clientSchema.index({ 'wedding.servicePreferences': 1 });


clientSchema.pre(/^find/, function (next) {
	this.where({ deletedAt: null });
});

const client = mongoose.model('Client', clientSchema);

module.exports = { client };