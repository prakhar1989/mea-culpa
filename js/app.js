var React = require('react');
var Main = require('./components/Main');

// CSS!
require('../css/main.css');

var App = React.createClass({
    render() {
        return <Main />
    }
});

React.render(<App />, document.getElementById("app"));
