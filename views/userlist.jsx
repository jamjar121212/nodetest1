var React = require('react');
var DefaultLayout = require('./layouts/default');

var mailTo = function(email) {
    return "mailto:" + email;
};

var userListItem = function(user, i) {
    return <li key={i}>
        <a href={mailTo(user.email)}>{user.username}</a>
    </li>;
};

var UserList = React.createClass({
    render: function() {
        return <DefaultLayout title={this.props.title}>
            <h1>User List</h1>
            <ul>
                {this.props.userlist.map(userListItem)}
            </ul>
        </DefaultLayout>
    }
});

module.exports = UserList;
