const sendResponse = require('../../utils/response');
const HTTP_STATUS = require('../../constants/statusCodes');
const { getGrowth, getLocation } = require('../../service/admin/adminDashboardServices');

const viewDashboardController = async (req, res) => {
    const year = parseInt(req.query.year);
    const startMonth = parseInt(req.query.startMonth);
    const endMonth = parseInt(req.query.endMonth);
    const city = req.query.city;
    // const growthData = await getGrowth(year, startMonth, endMonth);
    const locationData = await getLocation(city);
    return sendResponse(res, HTTP_STATUS.OK, "Dashboard data retrieved successfully", locationData);
};

module.exports = {
    viewDashboardController,
};