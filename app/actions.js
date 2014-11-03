var Reflux = require('reflux');

var Actions = Reflux.createActions([
    'loadServices',
    'addService',
    'deleteService',
    'testService',
    'testMethod'
]);

Actions.loadServices();

module.exports= Actions;