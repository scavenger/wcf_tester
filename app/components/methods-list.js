/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');
var TestStore = require('../stores/test-store');

var MethodsList = React.createClass({
    mixins: [Reflux.ListenerMixin],
    getInitialState: function() {
        return {methods: []};
    },
    componentDidMount: function() {
        this.listenTo(TestStore, this.onMethodsChange);
    },
    onServicesChange: function(methods) {
        this.setState({methods: methods});
    },
    render: function() {
        var methods = this.state.methods.map(function(method) {
            var className = method.errorCode ? 'text-success' : 'text-danger';
            return (
                <li className="list-group-item" key={method._id}>
                    <span className={className}>{method.name}</span>
                </li>
            );
        }.bind(this));

        return (
            <ul className="list-group">
                {methods}
            </ul>
        );
    }
});

module.exports = MethodsList;
