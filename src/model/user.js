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
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
