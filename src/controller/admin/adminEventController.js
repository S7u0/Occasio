const sendResponse = require('../../utils/response.js');
const HTTP_STATUS = require('../../constants/statusCodes.js');
const {
	createEvent,
	viewEvents,
	viewEventDetails,
	updateEvent,
	deleteEvent,
} = require('../../service/admin/adminEventServices.js');

const createEventController = async (req, res) => {
	const data = req.body;
	const createdBy = req.user.id;
	data.createdBy = createdBy;
	const event = await createEvent(data);
	return sendResponse({
		res,
		statusCode: HTTP_STATUS.CREATED,
		message: 'Event created successfully',
		data: event 
        });
};

const viewEventsController = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 20;

	const result = await viewEvents(page, limit);

	return sendResponse({
		res,
		statusCode: HTTP_STATUS.OK,
		message: 'Events retrieved successfully',
		data: result ,
    });
};

const viewEventDetailsController = async (req, res) => {
	const eventId = req.params.id;
	const event = await viewEventDetails(eventId);
	if (!event) {
		return sendResponse({
            res, 
            statusCode: HTTP_STATUS.NOT_FOUND, 
            message: 'Event not found'
        });
	}
	const cleanedEvent = {
		name: event.name,
		code: event.code,
		parentCode: event.parentCode,
	};
	return sendResponse({
        res, 
        statusCode: HTTP_STATUS.OK,
        message: 'Event Detail retrieved Successfully',
        data: cleanedEvent 
        });
};

const updateEventController = async (req, res) => {
	const eventId = req.params.id;
	if (!eventId) {
		return sendResponse({
            res, 
            statusCode: HTTP_STATUS.NOT_FOUND, 
            message: 'Event not found'
        });
	}
	const data = req.body;
	const updatedBy = req.user.id;
	data.updatedBy = updatedBy;
	const updatedEvent = await updateEvent(eventId, data);
	return sendResponse({
        res, 
        statusCode: HTTP_STATUS.OK,
        message: 'Event Updated Successfully',
        data: updatedEvent 
    });
};

const deleteEventController = async (req, res) => {
	const eventId = req.params.id;
	if (!eventId) {
		return sendResponse({
            res, 
            statusCode: HTTP_STATUS.NOT_FOUND, 
            message: 'Event not found'
        });
	}
	const data = req.user;
	data.deletedBy = req.user.id;
	const deletedEvent = await deleteEvent(eventId, data);
	return sendResponse({
        res, 
        statusCode: HTTP_STATUS.OK, 
        message: 'Event Deleted Successfully',    
        data: deletedEvent 
    });
};

module.exports = {
	createEventController,
	viewEventsController,
	viewEventDetailsController,
	updateEventController,
	deleteEventController,
};
