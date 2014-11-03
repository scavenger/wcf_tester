var $ = require('jquery');
var Reflux = require('reflux');
var Actions = require('../actions');

var TEST_SERVICE_URL = 'http://localhost:27321/testservice',
    TEST_METHOD_URL = 'http://localhost:27321/testmethod';

var TestStore = Reflux.createStore({
    methods: {},
    listenables: Actions,
    onTestService: function(service) {
        $.post(TEST_SERVICE_URL, {url: service.uri}).done(function(data) {
            this.methods[service._id] = [];
            data.forEach(function(method) {
                this.onTestMethod(service._id, service.uri, method);
            }.bind(this));
        }.bind(this));
    },    
    onTestMethod: function(id, url, method) {
        $.post(TEST_METHOD_URL, {url: url, method: method}).done(function(data) {
			this.methods[id].push({name: method, errorCode: data});
            this.trigger(this.methods);
        }.bind(this));
    }
});

module.exports = TestStore;
