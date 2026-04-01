const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.objectId = Joi.objectId();

const registerSchema = Joi.object({
	username: Joi.string().min(3).max(30).required(),
	email: Joi.string().email().required(),
	phone: Joi.string()
		.pattern(/^[0-9]{10}$/)
		.required()
		.messages({
			'string.pattern.base': 'Phone number must be 10 digits',
		}),
	password: Joi.string().min(6).required(),
	role: Joi.string().valid('ADMIN', 'CLIENT', 'VENDOR').default('USER'),
});

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

const profileSchema = Joi.object({
	profile: Joi.object({
		gender: Joi.string()
			.valid('MALE', 'FEMALE', 'OTHER', 'Male', 'Female', 'Other')
			.required(),
		dateOfBirth: Joi.date().required(),
		language: Joi.array().items(Joi.string()),
		photo: Joi.string().uri(),

		location: Joi.object({
			city: Joi.objectId().required(),
			state: Joi.objectId().required(),
			country: Joi.objectId().required(),
		}),
	}),
});

const weddingSchema = Joi.object({
	wedding: Joi.object({
		eventDate: Joi.object({
			start: Joi.date().required(),
			end: Joi.date().greater(Joi.ref('start')).required().messages({
				'date.greater': 'End date must be after start date',
			}),
		}),

		budget: Joi.number().min(0),

		guest: Joi.number().min(1),

		venuePreferences: Joi.array().items(this.objectId),

		customVenue: Joi.string().max(150),
	}),
});

const venueSchema = Joi.object({
	code: Joi.string()
		.uppercase()
		.pattern(/^[A-Z_]+$/)
		.required(),

	name: Joi.string().min(3).max(50).required(),
});

const vendorSchema = Joi.object({
	profile: Joi.object({
		businessName: Joi.string().min(3).max(100).required(),
		ownerName: Joi.string().min(3).max(100).required(),
		address: Joi.string().max(200),
		yearsOfExperience: Joi.number().min(0),
		description: Joi.string().max(500),
		photo: Joi.string().uri(),
		location: Joi.object({
			city: Joi.objectId().required(),
			state: Joi.objectId().required(),
			country: Joi.objectId().required(),
		}),
		venuePreferences: Joi.array().items(this.objectId),
		customVenue: Joi.string().max(150),
		eventPreferences: Joi.array().items(this.objectId),
	}),
});

const serviceSchema = Joi.object({
	code: Joi.string()
		.uppercase()
		.pattern(/^[A-Z_]+$/)
		.required(),
	name: Joi.string().min(3).max(100).required(),
	parentService: this.objectId,
	isActive: Joi.boolean().default(true),
});

const eventSchema = Joi.object({
	code: Joi.string()
		.pattern(/^[A-Z_]+$/)
		.required(),
	name: Joi.string().min(3).max(100).required(),
	parentEvent: this.objectId,
	isActive: Joi.boolean().default(true),
});

const querySchema = Joi.object({
	page: Joi.number().integer().min(1).empty('').default(1).optional(),
	limit: Joi.number().integer().min(1).max(100).empty('').default(10).optional(),
	search: Joi.string().max(50).empty('').optional(),
	stateId: Joi.string().hex().length(24).optional(),
	countryId: Joi.string().hex().length(24).optional()
});

module.exports = {
	registerSchema,
	loginSchema,
	profileSchema,
	weddingSchema,
	venueSchema,
	vendorSchema,
	serviceSchema,
	eventSchema,
	querySchema,
};
