var React = require('react');
var DefaultLayout = require('./layouts/default');

var RemoveUserCheckbox = React.createClass({
    render: function() {
        return (
            <p><input type="checkbox" name="username" value={this.props.username} /> {this.props.username} </p>
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
            <h1>Remove User</h1>
            <form method="post" action="/deleteuser">
                <ul>
                    {this.props.userlist.map( (user, i) => <RemoveUserCheckbox key={i} username={user.username}/> )}
                </ul>
                <button type="submit">Delete</button>
            </form>
        </DefaultLayout>
    }
});

module.exports = NewUser;
