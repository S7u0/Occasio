const { City } = require('../model/city');
const { Country } = require('../model/country');
const { State } = require('../model/state');


const city = [
    {
        name: 'Surat',
        code: 'SUR',
        country: 'IN',
        state: 'GJ',
    },
    {
        name: 'Ahmedabad',
        code: 'AMD',
        country: 'IN',
        state: 'GJ',
    },
    {
        name: 'Mumbai',
        code: 'MUM',
        country: 'IN',
        state: 'MH',
    },
    {
        name: 'Pune',
        code: 'PUN',
        country: 'IN',
        state: 'MH',
    },
    {
        name: 'Jaipur',
        code: 'JAI',
        country: 'IN',
        state: 'RJ',
    },
    {
        name: 'Los Angeles',
        code: 'LA',
        country: 'US',
        state: 'CA',
    },
    {
        name: 'San Francisco',
        code: 'SF',
        country: 'US',
        state: 'CA',
    },
    {
        name: 'Houston',
        code: 'HOU',
        country: 'US',
        state: 'TX',
    },
    {
        name: 'Dallas',
        code: 'DAL',
        country: 'US',
        state: 'TX',
    },
    {
        name: 'New York City',
        code: 'NYC',
        country: 'US',
        state: 'NY',
    },
    {
        name: 'Sydney',
        code: 'SYD',
        country: 'AU',
        state: 'NSW',
    },
    {
        name: 'Melbourne',
        code: 'MEL',    
        country: 'AU',
        state: 'VIC',
    },
    {
        name: 'Berlin',
        code: 'BER',
        country: 'DE',
        state: 'BE',
    },
    {
        name: 'Munich',
        code: 'MUN',
        country: 'DE',
        state: 'BY',
    },
    {
        name: 'Toronto',
        code: 'TOR',
        country: 'CA',
        state: 'ON',
    },
    {
        name: 'Ottawa',
        code: 'OTT',
        country: 'CA',
        state: 'ON',
    },
    {
        name: 'Vancouver',
        code: 'VAN',
        country: 'CA',
        state: 'BC',
    },
    {
        name: 'London',
        code: 'LON',
        country: 'GB',
        state: 'ENG',
    },
    {
        name: 'Manchester',
        code: 'MAN',
        country: 'GB',
        state: 'ENG',
    },
    {
        name: 'Tokyo',
        code: 'TOK',
        country: 'JP',
        state: '13',
    }
];

const seedCities = async () => {
    for (const c of city) {
        const existingCity = await City.findOne({ code: c.code });
        const country = await Country.findOne({ code: c.country });
        const state = await State.findOne({ code: c.state });
        // console.log(state);
        if (!country) {
            throw new Error(`Country with code ${c.country} not found for city ${c.name}`);
        }
        if (!state) {
            throw new Error(`State with code ${c.state} not found for city ${c.name}`);
        }
        c.country = country._id;
        c.state = state._id;

        if (!existingCity) {
            await City.findOneAndUpdate(
                { code: c.code },
                {
                    $setOnInsert: {
                        name: c.name,
                        code: c.code,
                        country: c.country,
                        state: c.state,
                        isActive: true,
                    },
                },
                { upsert: true, new: true }
            );
        }
    }
    console.log('City seeded successfully');
};

module.exports = { 
    seedCities
};