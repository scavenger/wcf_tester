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
			return (<span></span>);
			
        var methods = serviceMethods.map(function(method) {
			
			var badge = '';
			var className = 'text-success';
			if(method.errorCode != 0) {
				badge = <span className="badge">{method.errorCode}</span>;
				className = 'text-danger';
			}
			
            return (
                <li className="list-group-item col-xs-4" key={method._id}>
					{badge}
                    <span className={className}>{method.name}</span>
                </li>
            );
        }.bind(this));

        return (
            <ul className="list-group row">
                {methods}
            </ul>
        );
    }
});

module.exports = MethodsList;
