var React = require('react');
var Router = require('react-router');
var Main = require('../Components/Main');
var DepartmentsListing = require('../Pages/DepartmentsListing');
var { DefaultRoute, Route } = Router;

module.exports = (
    <Route name="app" path="/" handler={Main}>
        <DefaultRoute handler={DepartmentsListing} />
    </Route>
);
