const express = require('express');
const router = express.Router();
const adminController = require('../../controller/admin/adminServiceController');
const { isAuth } = require('../../middleware/authenticate');
const wrapAsync = require('../../utils/wrapAsync');
const { descriptor } = require('../../middleware/descriptor');
const validateBody = require('../../middleware/validateBody');
const { serviceSchema } = require('../../utils/schema');

router.post(
    '/service/create',
    isAuth,
    descriptor('service.create', 'Create a new service'),
    validateBody(serviceSchema),
    wrapAsync(adminController.createServiceController),
);

router.get(
    '/service/list',
    isAuth,
    descriptor('service.viewAll', 'View all services'),
    wrapAsync(adminController.viewServicesController),
);

router.get(
    '/service/:id',
    isAuth,
    descriptor('service.view', 'View service details'),
    wrapAsync(adminController.viewServiceDetailsController),
);

router.patch(
    '/service/:id',
    isAuth,
    descriptor('service.update', 'Update service details'),
    wrapAsync(adminController.updateServiceController),
);

router.delete(
    '/service/:id',
    isAuth,
    descriptor('service.delete', 'Delete a service'),
    wrapAsync(adminController.deleteServiceController),
);

module.exports = router;