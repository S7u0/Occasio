const { Event } = require('../../model/event');

const createEvent = async (data) => {
	const existingEvent = await Event.findOne({ code: data.code });

	if (existingEvent) {
		throw new Error('Event with this code already exists');
	}

	const newEvent = await Event.create(data);
	return newEvent;
};

const viewEvents = async (page, limit) => {
	if (page < 1) page = 1;
	if (limit > 100) limit = 100;

	const skip = (page - 1) * limit;

	const filter = {
		deletedAt: null,
	};

	const totalRecords = await Event.countDocuments(filter);
	const totalPages = Math.ceil(totalRecords / limit);

	const events = await Event.find(filter)
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit);

	return {
		pagination: {
			totalRecords,
			totalPages,
			currentPage: page,
			pageSize: limit,
			hasNextPage: page < totalPages,
			hasPrevPage: page > 1,
		},
		data: events,
	};
};

const viewEventDetails = async (eventId) => {
	const event = await Event.findById(eventId);
	return event;
};

const updateEvent = async (eventId, data) => {
	const updatedEvent = await Event.findById(eventId);
	if (!updatedEvent) {
		return null;
	}
	Object.assign(updatedEvent, data);
	await updatedEvent.save();
	return updatedEvent;
};

const deleteEvent = async (eventId, data) => {
	const deletedEvent = await Event.findById(eventId);
	if (!deletedEvent) {
		return null;
	}
	deletedEvent.isActive = false;
	deletedEvent.deletedBy = data.id;
	deletedEvent.deletedAt = new Date();
	await deletedEvent.save();
	return deletedEvent;
};

module.exports = {
	createEvent,
	viewEvents,
	viewEventDetails,
	updateEvent,
	deleteEvent,
};
