var React = require('react');
var Router = require('react-router');
var routes = require('./Utils/Routes');

// CSS!
require('../css/main.styl');

Router.run(routes, function(Root) {
    React.render(<Root />, document.getElementById("app"));
});
