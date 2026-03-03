const { string } = require('joi');
const { client } = require('../../model/clientProfile');
const { vendor } = require('../../model/vendorProfile');

const getGrowth = async (year, startMonth, endMonth) => {
	const totalClients = await client.countDocuments();
	const totalVendors = await vendor.countDocuments();
	const thisMonth = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		1,
	);

	startMonth = startMonth ? parseInt(startMonth) : 1;
	endMonth = endMonth ? parseInt(endMonth) : 12;
	const startDate = new Date(year, startMonth - 1, 1);
	const endDate = new Date(year, endMonth, 1);

	const clientsThisMonth = await client.countDocuments({
		createdAt: { $gte: thisMonth },
	});

	const vendorsThisMonth = await vendor.countDocuments({
		createdAt: { $gte: thisMonth },
	});

	const clientsData = await client.aggregate([
		{
			$match: {
				createdAt: { $gte: startDate, $lt: endDate },
			},
		},
		{
			$group: {
				_id: { month: { $month: '$createdAt' } },
				count: { $sum: 1 },
			},
		},
	]);

	const vendorsData = await vendor.aggregate([
		{
			$match: {
				createdAt: { $gte: startDate, $lt: endDate },
			},
		},
		{
			$group: {
				_id: { month: { $month: '$createdAt' } },
				count: { $sum: 1 },
			},
		},
	]);

	const monthlyData = [];

	for (let i = startMonth; i <= endMonth; i++) {
		const clientMonth = clientsData.find((m) => m._id.month === i);
		const vendorMonth = vendorsData.find((m) => m._id.month === i);

		monthlyData.push({
			month: i,
			clients: clientMonth ? clientMonth.count : 0,
			vendors: vendorMonth ? vendorMonth.count : 0,
		});
	}

	return {
		totalClients,
		totalVendors,
		clientsThisMonth,
		vendorsThisMonth,
		monthlyData,
	};
};

const getLocation = async (city) => {
	if (!city) {
		throw new Error('City is required');
	}

	// Case-insensitive city match
	const cityMatch = {
		"profile.location.city": { $regex: `^${city}$`, $options: 'i' },
	};

	// 🔹 Client aggregation
	const clientData = await client.aggregate([
		{
			$match: cityMatch,
		},
		{
			$group: {
				_id: '$profile.location.city',
				count: { $sum: 1 },
			},
		},
	]);

	// 🔹 Vendor aggregation
	const vendorData = await vendor.aggregate([
		{
			$match: cityMatch,
		},
		{
			$group: {
				_id: '$profile.location.city',
				count: { $sum: 1 },
			},
		},
	]);

	const totalClients = clientData.length > 0 ? clientData[0].count : 0;
	const totalVendors = vendorData.length > 0 ? vendorData[0].count : 0;

	return {
		city,
		totalClients,
		totalVendors,
		totalUsers: totalClients + totalVendors,
	};
};

module.exports = {
	getGrowth,
	getLocation,
};
