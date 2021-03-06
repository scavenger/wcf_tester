/** @jsx React.DOM */
var React = require('react');
var Actions = require('../actions');

var AddService = React.createClass({
    getInitialState: function() {
        return {value: ''};
    },
    onChange: function(e) {
        this.setState({value: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        
        if (this.state.value) {
            Actions.addService({uri: this.state.value});
            this.setState({value: ''});
        }
    },
    render: function() {
        return (
            <form className="input-group" onSubmit={this.handleSubmit}>
                <input type="text" className="form-control" onChange={this.onChange} value={this.state.value} />
                <span className="input-group-btn">
                    <button className="btn btn-default" type="submit">Add Service</button>
                </span>
            </form>
        );
    }
});

module.exports = AddService;
