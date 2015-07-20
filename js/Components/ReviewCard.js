var React = require('react');

var ReviewCard = React.createClass({
    propTypes: {
        review: React.PropTypes.string.isRequired,
        workload: React.PropTypes.string.isRequired
    },
    render() {
        return (
            <div className="mdl-card mdl-cell mdl-cell--12-col">
                  <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text">Review</h2>
                  </div>
                  <div className="mdl-card__supporting-text"> { this.props.review } </div>
                  <div className="mdl-card__actions mdl-card--border">
                    <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                      <i className="material-icons">heart</i>
                    </button>
                  </div>
            </div>
        )
    }
});

module.exports = ReviewCard;
