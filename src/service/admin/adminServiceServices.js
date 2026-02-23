const { Service } = require('../../model/servicePreference');

const createService = async (serviceData) => {
    const existingService = await Service.findOne({ code: serviceData.code });

    if (existingService) {
        throw new Error('Service with this code already exists');
    }
    const newService = await Service.create(serviceData);
    return newService;
};

const viewServices = async () => {
    const services = await Service.find({ isActive: true });
    return services;
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
