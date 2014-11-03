/** @jsx React.DOM */
var React = require('react');
var Actions = require('../actions');

var DeleteService = React.createClass({
    clickHandler: function(service) {
        Actions.deleteService(this.props.service);
    },
    render: function() {
        return (
            <button className="btn btn-sm" onClick={this.clickHandler}>
                <span className="glyphicon glyphicon-trash"></span>
            </button>
        );
    }
});

module.exports = DeleteService;
