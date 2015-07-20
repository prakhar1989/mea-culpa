var React = require('react');
var Router = require('react-router');
var Api = require('../Utils/Api');

var DepartmentDetail = React.createClass({
    componentDidMount() {
        var id = this.props.params.id;
        Api.getDepartmentDetail(id)
           .then((data) => {
                var { info, courses } = data.data;
                var name = (info === undefined || courses === undefined) ? "No Data Found!" : info.name;
                if (this.isMounted()) {
                    this.setState({ name: name, courses: courses });
                }
           });
    },
    getInitialState() {
        return {
            name: "",
            courses: []
        }
    },
    render() {
        var id  = this.props.params.id;
        var courses = this.state.courses.map((course) =>
            <li key={course.id}> {course.name} - {course.number} </li>
        );
        var loader = <p>Loading...</p>;
        var deptHtml = (
            <div>
                <h2>{this.state.name}</h2>
                <ul>{ courses }</ul>
            </div>
        );
        return <div> { this.state.name.length === 0 ? loader : deptHtml } </div>;

    }
});

module.exports = DepartmentDetail;
