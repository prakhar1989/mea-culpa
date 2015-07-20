var React = require('react');
var data = require('../Utils/Departmentdata');
var DepartmentCard = require('../Components/DepartmentCard');

var DepartmentsListing = React.createClass({
    render() {
        var url = "/#/department/"
        var depts = data.departments.map((d) =>
            <DepartmentCard title={d.title} key={d.id} url={url + d.id} />
        );
        return (
            <div className="mdl-layout">
                <main classNameName="mdl-layout__content">
                    <div className="demo-grid-ruler mdl-grid">
                        { depts }
                    </div>
                </main>
            </div>
        );
    }
});

module.exports = DepartmentsListing;
