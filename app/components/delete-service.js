/** @jsx React.DOM */
var React = require('react');
var Actions = require('../actions');

var DeleteService = React.createClass({
    deleteService: function(service) {
        Actions.deleteService(this.props.service);
    },
    render: function() {
        return (
            <span className="pull-right">
                <button className="btn btn-xs" onClick={this.deleteService}>
                    <span className="glyphicon glyphicon-trash"></span>
                </button>
            </span>
        );
    }
});

module.exports = DeleteService;
