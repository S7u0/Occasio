const express = require('express');
const router = express.Router();
const { descriptor } = require('../middleware/descriptor');

router.post(
	'/make_payment',
	descriptor('payment.create', 'allow to create payment'),
	(req, res) => {
		res.send('saved');
		console.log('✅ paymentRoutes loaded');
	},
);

router.post(
	'/check_payment',
	descriptor('payment.check', 'allow to check payment'),
	(req, res) => {
		res.send('saved');
	},
);


module.exports = router;
