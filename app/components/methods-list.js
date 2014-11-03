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
    onMethodsChange: function(methods) {
        this.setState({methods: methods});
    },
    render: function() {
		var serviceMethods = this.state.methods[this.props.service._id];
		if (!serviceMethods)
			serviceMethods = [];
			
        var methods = serviceMethods.map(function(method) {
            var className = method.errorCode == 0 ? 'text-success' : 'text-danger';
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
