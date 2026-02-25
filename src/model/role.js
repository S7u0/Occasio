const mongoose = require('mongoose');
const { permissionSchema } = require('./permission');

const roleSchema = new mongoose.Schema({
	name: {
		type: String,
		enum: ['ADMIN', 'CLIENT', 'VENDOR'],
		required: true,
		unique: true,
	},
	permissions: {
        type: [permissionSchema],
    },
});

roleSchema.pre(/^find/, function (next) {
	this.where({ deletedAt: null });
	next();
});

module.exports = {
	Role: mongoose.model('Role', roleSchema),
};


