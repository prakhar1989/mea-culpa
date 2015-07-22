var React = require('react');
var Router = require('react-router');
var Main = require('../Components/Main');
var DepartmentsListing = require('../Pages/DepartmentsListing');
var DepartmentDetail = require('../Pages/DepartmentDetail');
var CourseDetail = require('../Pages/CourseDetail');
var Search = require('../Pages/Search');
var { DefaultRoute, Route } = Router;

module.exports = (
    <Route name="app" path="/" handler={Main}>
        <Route name="all_departments" path="departments/all" handler={DepartmentsListing} />
        <Route name="department" path="departments/:id" handler={DepartmentDetail} />
        <Route name="course" path="courses/:id" handler={CourseDetail} />
        <DefaultRoute handler={Search} />
    </Route>
);
