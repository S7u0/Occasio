const { Service } = require('../../model/servicePreference');

const createService = async (serviceData) => {
    const existingService = await Service.findOne({ code: serviceData.code });

    if (existingService) {
        throw new Error('Service with this code already exists');
    }
    const newService = await Service.create(serviceData);
    return newService;
};

const viewServices = async (page, limit) => {
    if (page < 1) page = 1;
    if (limit > 100) limit = 100;

    const skip = (page - 1) * limit;

    const filter = {
        deletedAt: null,
    };
    const totalRecords = await Service.countDocuments(filter);
    const totalPages = Math.ceil(totalRecords / limit);
    const services = await Service.find(filter)
        .populate('parentService', 'name code')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    return {
        pagination: {
            totalRecords,
            totalPages,
            currentPage: page,
            pageSize: limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
        data: services,
    };
};

const viewServiceDetails = async (serviceId) => {
    const service = await Service.findById(serviceId)
        .populate('parentService', 'name code');
    return service;
};

const updateService = async (serviceId, serviceData) => {
    const updatedService = await Service.findById(serviceId);
    if (!updatedService) {
        return null;
    }
    Object.assign(updatedService, serviceData);
    await updatedService.save();
    return updatedService;
};

const deleteService = async (serviceId, userId) => {
    const deletedService = await Service.findById(serviceId);
    console.log(userId);
    if (!deletedService) {
        return null;
    }
    deletedService.isActive = false;
    deletedService.deletedBy = userId;
    deletedService.deletedAt = new Date();
    await deletedService.save();
    return deletedService;
};

module.exports = {
    createService,
    viewServices,
    viewServiceDetails,
    updateService,
    deleteService,
};
