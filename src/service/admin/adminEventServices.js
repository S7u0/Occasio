const { Event } = require('../../model/event');
const { pagination } = require('../../utils/pagination');

const createEvent = async (data) => {
	const existingEvent = await Event.findOne({ code: data.code });

	if (existingEvent) {
		throw new Error('Event with this code already exists');
	}

	const newEvent = await Event.create(data);
	return newEvent;
};

const viewEvents = async (page, limit) => {

	const filter = {
		deletedAt: null,   v
	};

	const totalRecords = await Event.countDocuments(filter);
	
	const paginations = pagination(
		page,
		limit,
		totalRecords,
	);
	const records = await Event.find(filter)
		.sort({ createdAt: -1 })
		.skip((page - 1) * limit)
		.limit(limit);

	return {
		...paginations,
		records,
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