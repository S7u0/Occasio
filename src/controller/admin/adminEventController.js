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
    return sendResponse(res, HTTP_STATUS.CREATED, message = 'Event created successfully', event);
};

const viewEventsController = async (req, res) => {
    const events = await viewEvents();
    return sendResponse(res, HTTP_STATUS.OK, events);
};

const viewEventDetailsController = async (req, res) => {
    const eventId = req.params.id;
    const event = await viewEventDetails(eventId);
    if (!event) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, 'Event not found');
    }
    const cleanedEvent = {
        name: event.name,
        code: event.code,
        parentCode: event.parentCode,
    };
    return sendResponse(res, HTTP_STATUS.OK, cleanedEvent);
};

const updateEventController = async (req, res) => {
    const eventId = req.params.id;
    if (!eventId) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, 'Event not found');
    }
    const data = req.body;
    const updatedBy = req.user.id;
    data.updatedBy = updatedBy;
    // console.log(data);
    const updatedEvent = await updateEvent(eventId, data);
    return sendResponse(res, HTTP_STATUS.OK, updatedEvent);
};

const deleteEventController = async (req, res) => {
    const eventId = req.params.id;
    if (!eventId) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, 'Event not found');
    }
    const data = req.user;
    data.deletedBy = req.user.id;
    const deletedEvent = await deleteEvent(eventId, data);
    return sendResponse(res, HTTP_STATUS.OK, deletedEvent);
};

module.exports = {
    createEventController,
    viewEventsController,
    viewEventDetailsController,
    updateEventController,
    deleteEventController,
};