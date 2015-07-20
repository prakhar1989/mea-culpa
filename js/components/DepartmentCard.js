var React = require('react');

var DepartmentCard = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired
    },
    render() {
        var { title, url } = this.props;
        return (
            <div className="mdl-card mdl-shadow--2dp demo-card-wide mdl-cell mdl-cell--3-col">
                  <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text">{title}</h2>
                  </div>
                  <div className="mdl-card__actions mdl-card--border">
                    <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href={url}>
                      View Courses
                    </a>
                  </div>
                  <div className="mdl-card__menu">
                    <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                      <i className="material-icons">share</i>
                    </button>
                  </div>
            </div>
        )
    }
});

module.exports = DepartmentCard;
