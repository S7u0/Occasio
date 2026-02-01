const Joi = require('joi');

exports.objectId = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);

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
	role: Joi.string().valid('ADMIN', 'CLIENT', 'USER').default('USER'),
});

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

const profileSchema = Joi.object({
	username: Joi.string().min(3).max(30).required(),
	email: Joi.string().email().required(),
	phone: Joi.string().min(10).required(),
	profile: Joi.object({
		gender: Joi.string()
			.valid('MALE', 'FEMALE', 'OTHER', 'Male', 'Female', 'Other')
			.required(),
		dateOfBirth: Joi.date().required(),
		language: Joi.array().items(Joi.string()),
		photo: Joi.string().uri(),

		location: Joi.object({
			city: Joi.string().required(),
			state: Joi.string().required(),
			country: Joi.string().required(),
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

module.exports = {
	registerSchema,
	loginSchema,
	profileSchema,
	weddingSchema,
    venueSchema
};
