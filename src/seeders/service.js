const { Service } = require('../model/servicePreference');

const services = [
	// ===== PARENT SERVICES =====
	{
		name: 'Photography',
		code: 'PHOTOGRAPHY',
		parentCode: null,
	},
	{
		name: 'Catering',
		code: 'CATERING',
		parentCode: null,
	},
	{
		name: 'DJ & Music',
		code: 'DJ_MUSIC',
		parentCode: null,
	},
	{
		name: 'Decoration',
		code: 'DECORATION',
		parentCode: null,
	},
	{
		name: 'corporate Events',
		code: 'CORPORATE_EVENTS',
		parentCode: null,
	},
	{
		name: 'Sound & Lighting',
		code: 'SOUND_LIGHTING',
		parentCode: null,
	},

	// ===== PHOTOGRAPHY VARIANTS =====
	{
		name: 'Single Camera',
		code: 'SINGLE_CAMERA',
		parentCode: 'PHOTOGRAPHY',
	},
	{
		name: 'Traditional Photography',
		code: 'TRADITIONAL_PHOTO',
		parentCode: 'PHOTOGRAPHY',
	},
	{
		name: 'Candid Photography',
		code: 'CANDID_PHOTO',
		parentCode: 'PHOTOGRAPHY',
	},
	{
		name: 'Drone Photography',
		code: 'DRONE_PHOTO',
		parentCode: 'PHOTOGRAPHY',
	},

	// ===== CATERING VARIANTS =====
	{
		name: 'Veg Catering',
		code: 'VEG_CATERING',
		parentCode: 'CATERING',
	},
	{
		name: 'Non-Veg Catering',
		code: 'NON_VEG_CATERING',
		parentCode: 'CATERING',
	},
	{
		name: 'Live Food Counters',
		code: 'LIVE_COUNTERS',
		parentCode: 'CATERING',
	},

	// ===== DJ VARIANTS =====
	{
		name: 'DJ Only',
		code: 'DJ_ONLY',
		parentCode: 'DJ_MUSIC',
	},
	{
		name: 'DJ with Sound',
		code: 'DJ_SOUND',
		parentCode: 'DJ_MUSIC',
	},
	{
		name: 'DJ with Sound & Lights',
		code: 'DJ_SOUND_LIGHTS',
		parentCode: 'DJ_MUSIC',
	},

	// ===== CORPORATE VARIANTS =====
	{
		name: 'seminar',
		code: 'SEMINAR',
		parentCode: 'CORPORATE_EVENTS',
	},
	{
		name: 'Team Outing',
		code: 'TEAM_OUTING',
		parentCode: 'CORPORATE_EVENTS',
	},
];

const seedServices = async () => {
	const serviceMap = {};
	for (const service of services) {
		let parentServiceId = null;
		if (service.parentCode) {
			const parent = serviceMap[service.parentCode];
			if (!parent) {
				throw new Error(`Parent service ${service.parentCode} not found`);
			}
			parentServiceId = parent._id;
		}
		const savedService = await Service.findOneAndUpdate(
			{ code: service.code },
			{
				$setOnInsert: {
					name: service.name,
					code: service.code,
					parentService: parentServiceId,
					isActive: true,
					deletedAt: null,
				},
			},
			{ upsert: true, new: true },
		);
		serviceMap[service.code] = savedService;
	}
	console.log('✅ Service seeding completed');
};

module.exports = seedServices;