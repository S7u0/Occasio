const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema(
	{
		code: {
			type: String,
			required: true,
			unique: true,
			uppercase: true,
			trim: true,
		},

		name: {
			type: String,
			required: true,
			trim: true,
		},
		
		parentService: {
			type: Schema.Types.ObjectId,
			ref: 'Service',
			default: null,
		},

		isActive: {
			type: Boolean,
			default: true,
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
		}
	},
	{ timestamps: true }
);

serviceSchema.pre(/^find/, function (next) {
	this.where({ deletedAt: null });
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = { Service };
	