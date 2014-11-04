/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');
var AddService = require('./add-service');
var ServicesList = require('./services-list');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <h1>WCF Health Checker</h1>
                <AddService />
                <ServicesList />
            </div>
        );
    }
});

module.exports = App;
