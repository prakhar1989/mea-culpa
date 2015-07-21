var React = require('react');

var DepartmentCard = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired
    },
    render() {
        var { title, url } = this.props;
        return <h2 className="deptCard"><a href={url}>{title}</a></h2>;
    }
});

module.exports = DepartmentCard;
