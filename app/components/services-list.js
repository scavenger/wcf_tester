/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');
var Store = require('../store');

var ServicesList = React.createClass({
    mixins: [Reflux.ListenerMixin],
    getInitialState: function() {
        return {services: []};
    },
    componentDidMount: function() {
        this.listenTo(Store, this.onServicesChange);
    },
    onServicesChange: function(services) {
        this.setState({services: services});
    },
    render: function() {
        var services = this.state.services.map(function(service) {
            return <li className="list-group-item" key={service._id}>{service.uri}</li>;
        });
        return (
            <ul className="list-group">
                {services}
            </ul>
        );
    }
});

module.exports = ServicesList;
