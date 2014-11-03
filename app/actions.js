var Reflux = require('reflux');

var Actions = Reflux.createActions([
    'loadServices',
    'addService',
    'deleteService'
]);

Actions.loadServices();

module.exports= Actions;