const { client } = require('../../model/clientProfile');
const { vendor } = require('../../model/vendorProfile');
const { City } = require('../../model/city');

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
	const cityMatch = city ? { 'profile.location.city': city } : {};
	const cityData = await City.aggregate([
		{ $match: cityMatch },

		{
			$lookup: {
				from: 'clients',
				localField: '_id',
				foreignField: 'profile.location.city',
				as: 'clients',
			},
		},

		{
			$lookup: {
				from: 'vendors',
				localField: '_id',
				foreignField: 'profile.location.city',
				as: 'vendors',
			},
		},

		{
			$project: {
				_id: 0,
				city: '$name',
				clients: { $size: '$clients' },
				vendors: { $size: '$vendors' },
			},
		},
	]);
	return {
		cityData,
	};
};

module.exports = {
	getGrowth,
	getLocation,
};
