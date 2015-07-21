var React = require('react');

var ReviewCard = React.createClass({
    propTypes: {
        review: React.PropTypes.string.isRequired,
        workload: React.PropTypes.string.isRequired
    },
    render() {
        return (
            <div className="reviewCard">
              <p> { this.props.review } </p>
            </div>
        )
    }
});

module.exports = ReviewCard;
