var $ = require('jquery');
var Reflux = require('reflux');
var Actions = require('../actions');

var SERVICES_URL = 'http://localhost:27321/services';

var ServicesStore = Reflux.createStore({
    services: [],
    listenables: Actions,
    onLoadServices: function() {
        $.get(SERVICES_URL).done(function(data) {
            this.services = data;
            this.trigger(this.services);
        }.bind(this));
    },
    onAddService: function(service) {
        $.post(SERVICES_URL, service).done(function(data) {
            this.services.push(data);
            this.trigger(this.services);
        }.bind(this));
    },
    onDeleteService: function(service) {
        $.ajax({
            url: SERVICES_URL + '/' + service._id,
            type: 'delete'
        }).done(function(data) {
            var index = this.services.indexOf(service);
            if (index > -1) {
                this.services.splice(index, 1);
            }
            this.trigger(this.services);
        }.bind(this));
    }
});

module.exports = ServicesStore;
