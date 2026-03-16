const sendResponse = require('../../utils/response');
const HTTP_STATUS = require('../../constants/statusCodes');
const adminService = require('../../service/admin/adminServiceServices');

const createServiceController = async (req, res) => {
    const serviceData = req.body;
    serviceData.createdBy = req.user.id;
    const newService = await adminService.createService(serviceData);
    return sendResponse({
        res, 
        statusCode: HTTP_STATUS.CREATED,
        message: 'Service Create Successfully',
        data:newService 
    });
};

const viewServicesController = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const services = await adminService.viewServices(page, limit);
    return sendResponse({
        res, 
        statusCode: HTTP_STATUS.OK, 
        message: "Services retrieved successfully",
        data: services 
    });
};

const viewServiceDetailsController = async (req, res) => {
    const serviceId = req.params.id;
    const service = await adminService.viewServiceDetails(serviceId);
    if (!service) {
        return sendResponse({
            res, 
            statusCode: HTTP_STATUS.NOT_FOUND,
            message: 'Service not found'
        });
    }
    const cleanedService = {
        name: service.name,
        code: service.code,
        parentService: service.parentService ? {
            name: service.parentService.name,
            code: service.parentService.code,
        } : null,
    };
    return sendResponse({ 
        res, 
        statusCode: HTTP_STATUS.OK,
        message: "Service details retrieved successfully", 
        data: cleanedService 
    });
};

const updateServiceController = async (req, res) => {
    const serviceId = req.params.id;
    const updateData = req.body;
    const updatedBy = req.user.id;
    updateData.updatedBy = updatedBy;
    const updatedService = await adminService.updateService(serviceId, updateData);
    if (!updatedService) {
        return sendResponse({
            res, 
            statusCode: HTTP_STATUS.NOT_FOUND, 
            message: 'Service not found'
        });
    }
    return sendResponse({
        res, 
        statusCode: HTTP_STATUS.OK,
        message: 'Service Updated Successfully',
        data: updatedService 
    });
};

const deleteServiceController = async (req, res) => {
    const serviceId = req.params.id;
    const userId = req.user.id;
    const deletedService = await adminService.deleteService(serviceId, userId);
    
    if (!deletedService) {
        return sendResponse({
            res, 
            statusCode: HTTP_STATUS.NOT_FOUND, 
            message: 'Service not found'
        });
    }
    return sendResponse({
        res, 
        statusCode: HTTP_STATUS.OK, 
        message: 'Service deleted successfully',
        data: deletedService
    });
};

module.exports = {
    createServiceController,
    viewServicesController,
    viewServiceDetailsController,
    updateServiceController,
    deleteServiceController,
};