var React = require('react');
var DefaultLayout = require('./layouts/default');

var Index = React.createClass({
  render: function() {
    return <DefaultLayout title={this.props.title}>
        <h1>{this.props.title}</h1>
        <p>{this.props.title}</p>
    </DefaultLayout>
  }
});

module.exports = Index;
