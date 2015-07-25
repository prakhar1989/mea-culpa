var React = require('react');
var Router = require('react-router');
var Api = require('../Utils/Api');
var ReviewCard = require('../Components/ReviewCard');

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
            <ReviewCard key={review.id} 
                        review={review.review_text}
                        created={review.created}
                        workload={review.workload_text}
                        upvotes={review.upvotes}
                        downvotes={review.downvotes}
                        sentiment_score={review.sentiment_score} />
        );
        var loader = <p>Loading...</p>;
        var error = <p>No reviews found</p>;
        var deptHtml = (
            <div>
                <h4>{this.state.name}</h4>
                { this.state.reviews.length > 0 ? reviews : error }
            </div>
        );
        return (
         <div> { this.state.name.length === 0 ? loader : deptHtml } </div>
        )

    }
});

module.exports = CourseDetail;
