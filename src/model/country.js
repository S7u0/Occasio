const mongoose = require('mongoose');
const { Schema } = mongoose;

const countrySchema = new Schema(
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
        }
    },
    { timestamps: true }
);

countrySchema.pre(/^find/, function (next) {
    this.where({ deletedAt: null });
});

const Country = mongoose.model('Country', countrySchema);

module.exports = { Country };