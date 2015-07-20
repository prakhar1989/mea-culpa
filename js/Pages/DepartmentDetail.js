var React = require('react');

var DepartmentDetail = React.createClass({
    getInitialState() {
        return {
            name: "Department Name",
            courses: []
        }
    },
    render() {
        var { name, courses } = this.state;
        return (
            <div>
                <h2>{name}</h2>
            </div>

        );
    }
});

module.exports = DepartmentDetail;
