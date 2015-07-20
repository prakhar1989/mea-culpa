var React = require('react');
var Router = require('react-router');
var Api = require('../Utils/Api');

var CourseDetail = React.createClass({
    componentDidMount() {
        var id = this.props.params.id;
        Api.getCourseDetail(id)
           .then((data) => {
                var { info: {name, number}, reviews } = data.data;
                if (this.isMounted()) {
                    this.setState({ 
                        name: name,
                        number: number,
                        reviews: reviews 
                    });
                }
           });
    },
    getInitialState() {
        return {
            name: "",
            number: "",
            reviews: []
        }
    },
    render() {
        var id = this.props.params.id;
        var reviews = this.state.reviews.map((review) =>
            <li key={review.id}>{review.review_text}</li>
        );
        var loader = <p>Loading...</p>;
        var deptHtml = (
            <div>
                <h4>{this.state.name}</h4>
                <ul>{reviews}</ul>
            </div>
        );
        return <div> { this.state.name.length === 0 ? loader : deptHtml } </div>;

    }
});

module.exports = CourseDetail;
