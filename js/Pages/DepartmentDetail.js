var React = require('react');
var Router = require('react-router');
var Api = require('../Utils/Api');
var DepartmentCard = require('../Components/DepartmentCard');

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
            <div className="cell" key={course.id}>
                <p><a href={'/#/courses/' + course.id}>{course.name}</a></p>
            </div>
        );
        var loader = <p>Loading...</p>;
        var deptHtml = (
            <div>
                <h3>{this.state.name}</h3>
                { courses }
            </div>
        );
        return <div> { this.state.name.length === 0 ? loader : deptHtml } </div>;
    }
});

module.exports = DepartmentDetail;
