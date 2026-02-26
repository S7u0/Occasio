const pagination = (page, limit, totalRecords) => {
    if (page < 1) page = 1;
    if (limit > 100) limit = 100;
    const totalPages = Math.ceil(totalRecords / limit);

    return {
		pagination: {
			totalRecords,
			totalPages,
			currentPage: page,
			pageSize: limit,
			hasNextPage: page < totalPages,
			hasPrevPage: page > 1,
		}
    };         
};

module.exports = {
    pagination,
};