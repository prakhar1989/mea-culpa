var React = require('react');
var Header = require('./Header');
var { RouteHandler } = require('react-router');

var Main = React.createClass({
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <RouteHandler />
                </div>
            </div>
        );
    }
});

module.exports = Main;
