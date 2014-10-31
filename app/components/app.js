/** @jsx React.DOM */
var React = require('react');
var AddService = require('./add-service');
var ServicesList = require('./services-list');

var APP = React.createClass({
    render: function() {
        return (
            <div>
                <h1>WCF Services Tester</h1>
                <AddService />
                <ServicesList />
            </div>
        );
    }
});

module.exports = APP;
