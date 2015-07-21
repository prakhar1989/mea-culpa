var React = require('react');
var data = require('../Utils/Departmentdata');
var DepartmentCard = require('../Components/DepartmentCard');

var DepartmentsListing = React.createClass({
    render() {
        var url = "/#/department/"
        var depts = data.departments.map((d) =>
            <DepartmentCard title={d.title} key={d.id} url={url + d.id} />
        );
        return <div> { depts } </div>
    }
});

module.exports = DepartmentsListing;
