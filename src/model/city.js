const mongoose = require('mongoose');
const { Schema } = mongoose;

const citySchema = new Schema(
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
        country: {
                type: mongoose.Types.ObjectId,
                ref: 'Country',
        },
        state: {
                type: mongoose.Types.ObjectId,
                ref: 'State',
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

citySchema.pre(/^find/, function (next) {
    this.where({ deletedAt: null });
});

const City = mongoose.model('City', citySchema);

module.exports = { City };