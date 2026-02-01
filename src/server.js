require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const allRoutes = require('./routes');
const autoSyncPer  = require('./middleware/autoSyncPer');

(async () => {
	await connectDB();
	app.use(express.json());
	app.use('/api', allRoutes);

	await autoSyncPer(app);
	
	app.listen(process.env.PORT, () => {
		console.log('Server started at port', process.env.PORT);
	});
})();