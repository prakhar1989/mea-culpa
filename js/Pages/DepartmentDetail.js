var React = require('react');
var Router = require('react-router');

var DepartmentDetail = React.createClass({
    getInitialState() {
        return {
            name: "Department Name",
            courses: [
                {
                    id: 14,
                    name: "Intro to programming",
                    number: "COMS 1124"
                },
                {
                    id: 55,
                    name: "Python programming",
                    number: "COMS 2324"
                },
            ]
        }
    },
    render() {
        var id  = this.props.params.id;
        var courses = this.state.courses.map((course) =>
            <li key={course.id}> {course.name} - {course.number} </li>
        );

        return (
            <div>
                <h2>{this.state.name}</h2>
                <ul>{ courses }</ul>
            </div>

        );
    }
});

module.exports = DepartmentDetail;
