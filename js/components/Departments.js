var React = require('react');
var data = require('../utils/departments');

var Departments = React.createClass({
    render() {
        var url = "http://api.culpa.info/courses/department_id/";
        var depts = data.departments.map((d, i) => {
            return <div className="mdl-card mdl-shadow--2dp demo-card-wide mdl-cell mdl-cell--3-col">
                  <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text">{d.title}</h2>
                  </div>
                  <div className="mdl-card__actions mdl-card--border">
                    <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href={url + d.id}>
                      View Courses
                    </a>
                  </div>
                  <div className="mdl-card__menu">
                    <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                      <i className="material-icons">share</i>
                    </button>
                  </div>
                </div>
        });
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--overlay-drawer-button">
                <main classNameName="mdl-layout__content">
                    <div className="demo-grid-ruler mdl-grid">
                        { depts }
                    </div>
                </main>
            </div>
        );
    }
});

module.exports = Departments;
