const mongoose = require('mongoose');
const { Schema } = mongoose;

const stateSchema = new Schema(
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

stateSchema.pre(/^find/, function (next) {
    this.where({ deletedAt: null });
});

const State = mongoose.model('State', stateSchema);

module.exports = { State };