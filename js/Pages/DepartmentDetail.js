var React = require('react');
var Router = require('react-router');
var axios = require('axios');

var DepartmentDetail = React.createClass({
    componentDidMount() {
        var id = this.props.params.id;
        axios.get('http://localhost:3000/api/department/' + id).then(function(data){
            var {info, courses} = data.data;
            if (this.isMounted()) {
                this.setState({ name: info.name, courses: courses });
            }
        }.bind(this));
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

        return (
            <div>
                <h2>{this.state.name}</h2>
                <ul>{ courses }</ul>
            </div>

        );
    }
});

module.exports = DepartmentDetail;
