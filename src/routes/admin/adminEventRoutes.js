const express = require('express');
const router = express.Router();
const { descriptor } = require('../../middleware/descriptor');
const adminController = require('../../controller/admin/adminEventController');
const wrapAsync = require('../../utils/wrapAsync');
const { isAuth } = require('../../middleware/authenticate');
const validateRequest = require('../../middleware/validateBody');
const { eventSchema } = require('../../utils/schema');

router.post(
	'/event/create',
	isAuth,
	descriptor('event.create', 'Create a new event'),
	validateRequest(eventSchema),
	wrapAsync(adminController.createEventController),
);

router.get(
	'/event/list',
	isAuth,
	descriptor('event.viewAll', 'View all events'),
	wrapAsync(adminController.viewEventsController),
);

router.get(
	'/event/:id',
	isAuth,
	descriptor('event.view', 'View event details'),
	wrapAsync(adminController.viewEventDetailsController),
);

router.patch(
	'/event/:id',
	isAuth,
	descriptor('event.update', 'Update event details'),
	wrapAsync(adminController.updateEventController),
);

router.delete(
	'/event/:id',
	isAuth,
	descriptor('event.delete', 'Delete an event'),
	wrapAsync(adminController.deleteEventController),
);

module.exports = router;
