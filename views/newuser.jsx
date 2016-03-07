var React = require('react');
var DefaultLayout = require('./layouts/default');

var TextInput = React.createClass({
    getInitialState: function() {
        return {value: this.props.defaultValue};
    },
    render: function() {
        return (
            <input type="text" name={this.props.name} value={this.state.value}/>
        );
    }
});

var NewUser = React.createClass({
    getInitialState: function() {
        return {
            usernameValue: "username",
            emailValue: "email"
        };
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },

    render: function() {
        return <DefaultLayout title={this.props.title}>
            <h1>New User</h1>
            <form name="adduser" method="post" action="/login">
                <TextInput name="username" defaultValue={"username"}/>
                <TextInput name="useremail" defaultValue={"email"}/>
                <button type="submit">submit</button>
            </form>
        </DefaultLayout>
    }
});

module.exports = NewUser;
