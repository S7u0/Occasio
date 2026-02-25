const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},

		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},

		phone: {
			type: String,
			required: true,
			trim: true,
		},

		password: {
			type: String,
			required: true,
			select: false,
		},

		role: {
			type: mongoose.Types.ObjectId,
			ref: 'Role',
			required: true,
			select: false,
		},

		refreshToken: {
			type: String,
			select: false,
		},

		isActive: {
			type: Boolean,
			default: true,
		},
		profile: {
			gender: {
				type: String,
				enum: ['MALE', 'FEMALE', 'OTHER', 'Male', 'Female', 'Other'],
			},

			dateOfBirth: {
				type: Date,
			},

			language: {
				type: [String], // ["EN", "HI", "GU"]
				default: ['EN'],
			},

			photo: {
				type: String, // image URL
				default: '',
			},

			location: {
				city: String,
				state: String,
				country: {
					type: String,
					default: 'India',
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
					ref: 'VenuePreference',
				},
			],

			customVenue: {
				type: String,
				trim: true,
				maxlength: 150,
			},
		},
	},
	{
		timestamps: true,
	},
);

userSchema.pre('save', async function () {
	if (!this.isModified('password')) return;
	this.password = await bcrypt.hash(this.password, 15);
});

userSchema.pre(/^find/, function (next) {
	this.where({ deletedAt: null });
	next();
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
