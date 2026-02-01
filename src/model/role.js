const mongoose = require('mongoose');
const { permissionSchema } = require('./permission');

const roleSchema = new mongoose.Schema({
	name: {
		type: String,
		enum: ['ADMIN', 'CLIENT', 'USER'],
		required: true,
		unique: true, // ADMIN, CLIENT, USER
	},
	permissions: {
        type: [permissionSchema],
    },
});

module.exports = {
	Role: mongoose.model('Role', roleSchema),
};


