const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema(
	{
		key: {
			type: String,
			required: true,
			unique: true,
		},

		module: {
			type: String,
			required: true,
		},

		paths: [
			{
				type: String,
			},
		],

		description: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

permissionSchema.pre(/^find/, function (next) {
	this.where({ deletedAt: null });
	next();
});

module.exports = {
	Permission: mongoose.model('Permission', permissionSchema),
};