var React = require('react');
var Header = require('./Header');
var Departments = require('./Departments');

var Main = React.createClass({
    render() {
        return (
            <div>
                <Header />
                <Departments />
            </div>
        );
    }
});

module.exports = Main;
