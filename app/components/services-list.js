/** @jsx React.DOM */
var React = require('react');
var app = require('../app');

var ServicesList = React.createClass({
    getInitialState: function() {
        return {services: app.services};
    },
    componentDidMount: function() {
        var _this = this;
        app.onAddService(function() {
            _this.setState({services: app.services});
        });
    },
    render: function() {
        var services = this.state.services.map(function(service) {
            return <li className="list-group-item">{service}</li>;
        });
        return (
            <ul className="list-group">
                {services}
            </ul>
        );
    }
});

module.exports = ServicesList;
