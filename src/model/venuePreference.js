const mongoose = require('mongoose');
const { Schema } = mongoose;

const venueSchema = new Schema(
	{
		code: {
			type: String,
			required: true,
			unique: true,
			uppercase: true,
			trim: true,
			match: /^[A-Z_]+$/, // BEACH, DESTINATION_WEDDING
		},

		name: {
			type: String,
			required: true,
			trim: true,
		},

		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.models.Venue || mongoose.model('Venue', venueSchema);
