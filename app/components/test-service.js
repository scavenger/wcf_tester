/** @jsx React.DOM */
var React = require('react');
var Actions = require('../actions');

var DeleteService = React.createClass({
    clickHandler: function(service) {
        Actions.testService(this.props.service);
    },
    render: function() {
        return (
            <button className="btn btn-sm btn-primary" onClick={this.clickHandler}>
                <span className="glyphicon glyphicon-play text-primary"></span>
            </button>
        );
    }
});

module.exports = DeleteService;
