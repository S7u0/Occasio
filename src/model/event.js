const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},

		code: {
			type: String,
			required: true,
			uppercase: true,
			trim: true,
		},

		parentEvent: {
			type: Schema.Types.ObjectId,
			ref: 'Event',
		},

		isActive: {
			type: Boolean,
			default: true,
			index: true,
		},

		deletedAt: {
			type: Date,
		},
		deletedBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		updatedBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			index: true,
		},
	},
	{ optimisticConcurrency: true, timestamps: true },
);

eventSchema.index({ parentEvent: 1, code: 1 }, { unique: true });

eventSchema.pre(/^find/, function (next) {
	this.where({ deletedAt: null });
	next();
});

const Event = mongoose.model('Event', eventSchema);
module.exports = { Event };
