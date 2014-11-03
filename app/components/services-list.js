/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');
var TestService = require('./test-service');
var DeleteService = require('./delete-service');
var MethodsList = require('./methods-list');
var ServicesStore = require('../stores/services-store');

var ServicesList = React.createClass({
    mixins: [Reflux.ListenerMixin],
    getInitialState: function() {
        return {services: []};
    },
    componentDidMount: function() {
        this.listenTo(ServicesStore, this.onServicesChange);
    },
    onServicesChange: function(services) {
        this.setState({services: services});
    },
    render: function() {
        var services = this.state.services.map(function(service) {
            return (
                <li className="list-group-item" key={service._id}>
                    <label>{service.uri}</label>
                    <span className="pull-right">
                        <TestService service={service} />
                        <DeleteService service={service} />
                    </span>
                    <MethodsList service={service} />
                </li>
            );
        }.bind(this));

        return (
            <ul className="list-group">
                {services}
            </ul>
        );
    }
});

module.exports = ServicesList;
