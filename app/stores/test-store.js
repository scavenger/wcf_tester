var $ = require('jquery');
var Reflux = require('reflux');
var Actions = require('../actions');

var TEST_SERVICE_URL = 'http://localhost:27321/testservice',
    TEST_METHOD_URL = 'http://localhost:27321/testmethod';

var TestStore = Reflux.createStore({
    methods: [],
    listenables: Actions,
    onTestService: function(service) {
        $.post(TEST_SERVICE_URL, {url: service.uri}).done(function(data) {
            data.forEach(function(method) {
                this.onTestMethod(service.uri, method);
            }.bind(this));
        }.bind(this));
    },    
    onTestMethod: function(url, method) {
        $.post(TEST_METHOD_URL, {url: url, method: method}).done(function(data) {
            this.methods.push({name: method, errorCode: data});
            this.trigger(_this.methods);
        }.bind(this));
    }
});

module.exports = TestStore;
