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
            <DepartmentCard title={course.name} key={course.id} url={'/#/course/' + course.id} />
        );
        var loader = <p>Loading...</p>;
        var deptHtml = (
            <div>
                <h4>{this.state.name}</h4>
                { courses }
            </div>
        );
        return (
            <div className="mdl-layout">
                <main classNameName="mdl-layout__content">
                    <div className="demo-grid-ruler mdl-grid">
                        { this.state.name.length === 0 ? loader : deptHtml }
                    </div>
                </main>
            </div>
        );

    }
});

module.exports = DepartmentDetail;
