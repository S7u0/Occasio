const { Role } = require('../model/role');
const { Permission } = require('../model/permission');

const createRole = async ({ name, permissions }) => {
	const role = await Role.findOne({ name: roleName });

	if (!role) {
		throw new Error('Role not found');
	}

	// 🔍 check by key (NOT object reference)
	const exists = role.permissions.some((p) => p.key === permission.key);

	if (!exists) {
		role.permissions.push({
			key: permission.key,
			module: permission.module,
			description: permission.description,
			paths: permission.paths,
		});

		await role.save();
		console.log(`✅ Added ${permission.key} to ${roleName}`);
	} else {
		console.log(`ℹ️ ${permission.key} already exists in ${roleName}`);
	}

	return role;
};

module.exports = {
	createRole,
};
