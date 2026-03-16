require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const allRoutes = require('./routes');
const autoSyncPer  = require('./middleware/autoSyncPer');
const seedEvents  = require('./seeders/event');
const seedServices = require('./seeders/service');
const seedVenue = require('./seeders/venue');
const { seedCountries } = require('./seeders/country');
const { seedStates } = require('./seeders/state');
const { seedCities } = require('./seeders/city');
const errorHandler = require('../src/middleware/errorHandler');

(async () => {
	await connectDB();
	app.use(express.json());
	app.use('/api', allRoutes);

	await autoSyncPer(app);
	await seedCountries();
	await seedStates();
	await seedCities();
	// await seedEvents(); 
	// await seedServices();
	// await seedVenue();

	app.listen(process.env.PORT, () => {
		console.log('Server started at port', process.env.PORT);
	});
	app.use(errorHandler);
})();