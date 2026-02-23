const { venuePreference } = require('../../model/venuePreference');

const createVenue = async (data) => {
    const existingVenue = await venuePreference.findOne({ code: data.code });
    
    if (existingVenue) {
        throw new Error('Venue with this code already exists');
    }
    const newVenue = await venuePreference.create(data);
    return newVenue;
};

const viewVenues = async () => {
    const venues = await venuePreference.find({ deletedAt: null });
    return venues;
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
