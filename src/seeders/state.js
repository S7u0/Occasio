const { State } = require('../model/state');
const { Country } = require('../model/country');

const states = [
	{
		name: 'Gujarat',
		code: 'GJ',
		country: 'IN',
	},
	{
		name: 'Maharashtra',
		code: 'MH',
		country: 'IN',
	},
	{
		name: 'Rajasthan',
		code: 'RJ',
		country: 'IN',
	},
	{
		name: 'California',
		code: 'CA',
		country: 'US',
	},
	{
		name: 'Texas',
		code: 'TX',
		country: 'US',
	},
	{
		name: 'New York',
		code: 'NY',
		country: 'US',
	},
	{
		name: 'Ontario',
		code: 'ON',
		country: 'CA',
	},
	{
		name: 'British Columbia',
		code: 'BC',
		country: 'CA',
	},
	{
		name: 'England',
		code: 'ENG',
		country: 'GB',
	},
	{
		name: 'Bavaria',
		code: 'BY',
		country: 'DE',
	},
	{
		name: 'Berlin',
		code: 'BE',
		country: 'DE',
	},
	{
		name: 'Tokyo Prefecture',
		code: '13',
		country: 'JP',
	},
	{
		name: 'New South Wales',
		code: 'NSW',
		country: 'AU',
	},
	{
		name: 'Victoria',
		code: 'VIC',
		country: 'AU',
	},
];

const seedStates = async () => {
	for (const s of states) {

		const country = await Country.findOne({ code: s.country });
		// console.log(country);
		if (!country) {
			throw new Error(
				`Country with code ${s.country} not found for state ${s.name}`,
			);
		}
		s.country = country._id;
		await State.findOneAndUpdate(
			{ code: s.code },
			{
				$setOnInsert: {
					name: s.name,
					code: s.code,
					country: s.country,
					isActive: true,
				},
			},
			{
				upsert: true,
				new: true,
			},
		);
	}
	console.log('States seeded successfully');
};

module.exports = {
	seedStates,
};
