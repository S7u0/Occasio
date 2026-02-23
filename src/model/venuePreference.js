const mongoose = require('mongoose');
const { Schema } = mongoose;

const venuePreferenceSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },  

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            index: true,
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
    },
    { timestamps: true },
);

const venuePreference = mongoose.model('Venue', venuePreferenceSchema);
module.exports = { venuePreference };