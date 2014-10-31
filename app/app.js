var events = require('events');
var eventEmitter = new events.EventEmitter();

var app = {
	services: [],

	addService: function (service) {
		this.services.push(service);
		eventEmitter.emit('addService');
	},

	onAddService: function(handler) {
		eventEmitter.on('addService', handler);
	}
};

module.exports = app;