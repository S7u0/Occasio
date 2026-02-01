const listEndpoints = require('express-list-endpoints');
const { Permission } = require('../model/permission');
const { Role } = require('../model/role');

const walkStack = async (stack, endpointPaths) => {
	for (const layer of stack) {

		if (layer.route) {
			const routePath = layer.route.path;
			for (const mw of layer.route.stack) {
				const perm = mw.handle.permission;
				if (!perm || !perm.key) continue;

				const fullPath = endpointPaths.find((p) => p.endsWith(routePath));
				if (!fullPath) continue;

				console.log('Detected:', fullPath);

				const moduleName = fullPath.split('/')[2] || 'root';

				await Permission.updateOne(
					{ key: perm.key },
					{
						$setOnInsert: {
							key: perm.key,
							description: perm.description,
							module: moduleName,
							paths: [],
						},
					},
					{ upsert: true },
				);

				await Permission.updateOne(
					{ key: perm.key, paths: { $ne: fullPath } },
					{ $push: { paths: fullPath } },
				);

				await Role.updateOne(
					{ name: 'ADMIN', 'permissions.key': { $ne: perm.key } },
					{
						$push: {
							permissions: {
								key: perm.key,
								module: moduleName,
								description: perm.description,
								paths: [fullPath],
							},
						},
					},
				);
			}
		}

		else if (layer.handle?.stack) {
			await walkStack(layer.handle.stack, endpointPaths);
		}
	}
};

const autoSyncPer = async (app) => {
	const endpoints = listEndpoints(app);
	const endpointPaths = endpoints.map((e) => e.path);

	await walkStack(app._router.stack, endpointPaths);
	console.log('✅ Permissions synced');
};

module.exports = autoSyncPer;