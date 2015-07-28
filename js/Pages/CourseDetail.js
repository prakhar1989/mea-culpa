var React = require('react');
var Api = require('../Utils/Api');
var ReviewCard = require('../Components/ReviewCard');

var CourseDetail = React.createClass({
    componentDidMount() {
        var id = this.props.params.id;
        Api.getCourseDetail(id)
           .then((data) => {
                var { info: {name, number}, reviews, department } = data.data;

                if (this.isMounted()) {
                    this.setState({ 
                        name: name,
                        number: number,
                        reviews: reviews,
                        department: department
                    });
                }
           });
    },
    getInitialState() {
        return {
            name: "",
            number: "",
            reviews: [],
            department: {}
        }
    },
    render() {
        var { reviews, name, department } = this.state;

        var reviews = reviews.map((review) =>
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
               <nav role="navigation">
                <ul className="list-unstyled list-inline breadcrumbs">
                  <li><a href="/#/departments/all">All Departments</a>›</li>
                  <li>
                      <a href={"/#/departments/" + department.id} className="current-item">
                        {department.name}
                      </a>
                  </li>
                </ul>
              </nav>

              <h5>{name}</h5>

              { this.state.reviews.length > 0 ? reviews : error }
            </div>
        );
        return (
         <div> { this.state.name.length === 0 ? loader : deptHtml } </div>
        )

    }
});

module.exports = CourseDetail;
