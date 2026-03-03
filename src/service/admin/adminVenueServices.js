const { venuePreference } = require('../../model/venuePreference');
const { pagination } = require('../../utils/pagination');

const createVenue = async (data) => {
    const existingVenue = await venuePreference.findOne({ code: data.code });
    
    if (existingVenue) {
        throw new Error('Venue with this code already exists');
    }
    const newVenue = await venuePreference.create(data);
    return newVenue;
};

const viewVenues = async (page, limit) => {
    const filter = {
        deletedAt: null,
    };
    const totalRecords = await venuePreference.countDocuments(filter);

    const paginations = pagination(
        page,
        limit,
        totalRecords,
    );
    const records = await venuePreference.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    return {
        ...paginations,
        records,
    };
};

const viewVenueDetails = async (venueId) => {
    const venue = await venuePreference.findById(venueId);
    return venue;
};

const updateVenue = async (venueId, data) => {
    const updatedVenue = await venuePreference.findById(venueId);
    if (!updatedVenue) {
        return null;
    }
    Object.assign(updatedVenue, data);
    await updatedVenue.save();
    return updatedVenue;
};

const deleteVenue = async (venueId, data) => {
    const deletedVenue = await venuePreference.findById(venueId);
    if (!deletedVenue) {
        return null;
    }   
    deletedVenue.isActive = false;
    deletedVenue.deletedBy = data.id;
    deletedVenue.deletedAt = new Date();
    await deletedVenue.save();
    return deletedVenue;
};

module.exports = {
    createVenue,
    viewVenues,
    viewVenueDetails,
    updateVenue,
    deleteVenue,
};