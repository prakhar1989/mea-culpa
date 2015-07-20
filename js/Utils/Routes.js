var React = require('react');
var Router = require('react-router');
var Main = require('../Components/Main');
var DepartmentsListing = require('../Pages/DepartmentsListing');
var DepartmentDetail = require('../Pages/DepartmentDetail');
var CourseDetail = require('../Pages/CourseDetail');
var { DefaultRoute, Route } = Router;

module.exports = (
    <Route name="app" path="/" handler={Main}>
        <Route name="department" path="department/:id" handler={DepartmentDetail} />
        <Route name="course" path="course/:id" handler={CourseDetail} />
        <DefaultRoute handler={DepartmentsListing} />
    </Route>
);
