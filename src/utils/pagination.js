const pagination = async (page, limit, model) => {
    if (page < 1) page = 1;
    if (limit > 100) limit = 100;

    const skip = (page - 1) * limit;

    const filter = {
        deletedAt: null,
    };

    const totalRecords = await model.countDocuments(filter);
    const totalPages = Math.ceil(totalRecords / limit);

    const records = await model.find(filter)
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
		records,
    };         
};

module.exports = {
    pagination,
};