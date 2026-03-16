const { Event } = require('../model/event');

const events = [
	{
		name: 'Wedding',
		code: 'WEDDING',
		parentCode: null,
	},
	{
		name: 'Corporate Event',
		code: 'CORPORATE',
		parentCode: null,
	},
	{
		name: 'Pre Wedding',
		code: 'PRE_WEDDING',
		parentCode: 'WEDDING',
	},
	{
		name: 'Mehndi',
		code: 'MEHNDI',
		parentCode: 'PRE_WEDDING',
	},
	{
		name: 'Haldi',
		code: 'HALDI',
		parentCode: 'PRE_WEDDING',
	},
	{
		name: 'Reception',
		code: 'RECEPTION',
		parentCode: 'WEDDING',
	},

	{
		name: 'Seminar',
		code: 'SEMINAR',
		parentCode: 'CORPORATE',
	},

	{},
];

const seedEvents = async () => {
	const eventMap = {};
	for (const event of events) {
		let parentEventId = null;
		if (event.parentCode) {
			const parent = eventMap[event.parentCode];
			if (!parent) {
				throw new Error(`Parent event ${event.parentCode} not found`);
			}
			parentEventId = parent._id;
		}
		const savedEvent = await Event.findOneAndUpdate(
			{ code: event.code },
			{
				$setOnInsert: {
					name: event.name,
					code: event.code,
					parentEvent: parentEventId,
					isActive: true,
				},
			},
			{
				upsert: true,
				new: true,
			},
		);
		eventMap[event.code] = savedEvent;
	}
	console.log('✅ Event seeding completed');
};

module.exports = seedEvents;
