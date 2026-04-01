const { Country } = require('../model/country');

const country = [
	{ 
        code: 'IN', 
        name: 'India'
    },
	{
		code: 'US',
		name: 'United States',
	},
	{
		code: 'CA',
		name: 'Canada',
	},
	{
		code: 'AU',
		name: 'Australia',
	},
	{
		code: 'GB',
		name: 'United Kingdom',
	},
	{
		code: 'DE',
		name: 'Germany',
    },            
	{
		code: 'JP',
		name: 'Japan',
	},
];

const seedCountries = async () => {
    for (const c of country) {
        const existingCountry = await Country.findOne({ code: c.code });
        if (!existingCountry) {
            await Country.create(c);
        }
    }
    console.log('Countries seeded successfully');
};

module.exports = {
    seedCountries,
};