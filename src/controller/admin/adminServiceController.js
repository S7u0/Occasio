const sendResponse = require('../../utils/response');
const HTTP_STATUS = require('../../constants/statusCodes');
const adminService = require('../../service/admin/adminServiceServices');

const createServiceController = async (req, res) => {
    const serviceData = req.body;
    serviceData.createdBy = req.user.id;
    const newService = await adminService.createService(serviceData);
    return sendResponse(res, HTTP_STATUS.CREATED, newService);
};

const viewServicesController = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const services = await adminService.viewServices(page, limit);
    return sendResponse(res, HTTP_STATUS.OK, "Services retrieved successfully", services);
};

const viewServiceDetailsController = async (req, res) => {
    const serviceId = req.params.id;
    const service = await adminService.viewServiceDetails(serviceId);
    if (!service) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, 'Service not found');
    }
    const cleanedService = {
        name: service.name,
        code: service.code,
        parentService: service.parentService ? {
            name: service.parentService.name,
            code: service.parentService.code,
        } : null,
    };
    return sendResponse(res, HTTP_STATUS.OK, { message: "Service details retrieved successfully", data: cleanedService });
};

const updateServiceController = async (req, res) => {
    const serviceId = req.params.id;
    const updateData = req.body;
    const updatedBy = req.user.id;
    updateData.updatedBy = updatedBy;
    const updatedService = await adminService.updateService(serviceId, updateData);
    if (!updatedService) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, 'Service not found');
    }
    return sendResponse(res, HTTP_STATUS.OK, updatedService);
};

const deleteServiceController = async (req, res) => {
    const serviceId = req.params.id;
    const userId = req.user.id;
    const deletedService = await adminService.deleteService(serviceId, userId);
    
    if (!deletedService) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, 'Service not found');
    }
    return sendResponse(res, HTTP_STATUS.OK, 'Service deleted successfully');
};

module.exports = {
    createServiceController,
    viewServicesController,
    viewServiceDetailsController,
    updateServiceController,
    deleteServiceController,
};

