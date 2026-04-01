const express = require('express');
const router = express.Router();
const { descriptor } = require('../../middleware/descriptor');
const adminController = require('../../controller/admin/adminDashboardController');
const wrapAsync = require('../../utils/wrapAsync');
const { isAuth } = require('../../middleware/authenticate');

router.get(
    '/dashboard',
    isAuth,
    descriptor('dashboard.view', 'View dashboard metrics'),
    wrapAsync(adminController.viewDashboardController),
);

module.exports = router;