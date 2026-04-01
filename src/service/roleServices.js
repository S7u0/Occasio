const { Role } = require('../model/role');
const { Permission } = require('../model/permission');

const createRole = async ({ name, permissions = [] }) => {
	let role = await Role.findOne({ name });
	if (role) {
		throw new Error('Role already exists');
	}
	const permissionDocs = permissions.length? await Permission.find({ key: { $in: permissions } }): [];
	role = await Role.create({
		name,
		permissions: permissionDocs.map((p) => ({
			key: p.key,
			module: p.module,
			description: p.description,
			paths: p.paths,
		})),
	});
	return role;
};

module.exports = {
	createRole,
};