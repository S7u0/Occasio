const { venuePreference } = require('../model/venuePreference');

const venues = [
    {
        name: 'Banquet Hall',
        code: 'BANQUET_HALL',
    },
    {
        name: 'Outdoor Garden',
        code: 'OUTDOOR_GARDEN',
    },
    {
        name: 'Beachfront',
        code: 'BEACHFRONT',
    },
    {
        name: 'Historic Mansion',
        code: 'HISTORIC_MANSION',
    },
    {
        name: 'Rooftop Terrace',
        code: 'ROOFTOP_TERRACE',
    },
    {
        name: 'Rustic Barn',
        code: 'RUSTIC_BARN',
    },
    {
        name: 'Vineyard',   
        code: 'VINEYARD',
    },
    {
        name: 'Country Club',
        code: 'COUNTRY_CLUB',
    },
    {
        name: 'Museum',
        code: "MUSEUM",
    },
];

const seedVenue = async () => {
    for (const v of venues) {
        await venuePreference.findOneAndUpdate(  
            { code: v.code },
            {
                $setOnInsert: {
                    name: v.name,
                    code: v.code,
                    isActive: true,
                    deletedAt: null,
                },
            },
            { upsert: true, new: true }
        );
    }
    console.log('✅ Venue seeded completed');
};
module.exports = seedVenue;