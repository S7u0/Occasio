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
	return await pagination(page, limit, Event);
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
