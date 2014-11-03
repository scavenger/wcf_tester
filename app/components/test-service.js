/** @jsx React.DOM */
var React = require('react');
var Actions = require('../actions');

var DeleteService = React.createClass({
    clickHandler: function(service) {
        Actions.testService(this.props.service);
    },
    render: function() {
        return (
            <button className="btn btn-sm" onClick={this.clickHandler}>
                <span className="glyphicon glyphicon-play"></span>
            </button>
        );
    }
});

module.exports = DeleteService;
