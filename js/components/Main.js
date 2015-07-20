var React = require('react');
var Header = require('./Header');
var { RouteHandler } = require('react-router');

var Main = React.createClass({
    render() {
        return (
            <div>
                <Header />
                <RouteHandler />
            </div>
        );
    }
});

module.exports = Main;
