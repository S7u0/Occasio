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

module.exports = {
	Permission: mongoose.model('Permission', permissionSchema),
};
