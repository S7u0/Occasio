const express = require('express');
const router = express.Router();
const { descriptor } = require('../../middleware/descriptor');
const adminController = require('../../controller/admin/adminVenueController.js');
const wrapAsync = require('../../utils/wrapAsync');
const { isAuth } = require('../../middleware/authenticate');
const validateBody = require('../../middleware/validateBody');
const { venueSchema } = require('../../utils/schema');

router.post(
    '/venue/create',
    isAuth,
    descriptor('venue.create', 'Create a new venue'),
    validateBody(venueSchema),
    wrapAsync(adminController.createVenueController),
);

router.get(
    '/venue/list',
    isAuth,
    descriptor('venue.viewAll', 'View all venues'),
    wrapAsync(adminController.viewVenuesController),
);

router.get(
    '/venue/:id',
    isAuth,
    descriptor('venue.view', 'View venue details'),

    wrapAsync(adminController.viewVenueDetailsController),
);

router.patch(
    '/venue/:id',
    isAuth,
    descriptor('venue.update', 'Update venue details'),
    wrapAsync(adminController.updateVenueController),
);

router.delete(
    '/venue/:id',
    isAuth,
    descriptor('venue.delete', 'Delete a venue'),
    wrapAsync(adminController.deleteVenueController),
);

module.exports = router;