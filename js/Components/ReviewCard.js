var React = require('react');
var cx = require('classnames');

const MAXLENGTH = 500;

var ReviewCard = React.createClass({
    getDefaultProps() {
        return {
            upvotes: 0,
            downvotes: 0
        }
    },
    getInitialState() {
        return {
            isFav: false,
            isUpvoted: false,
            isDownvoted: false,
            visibleText: "",
            isExpanded: false,
            upvotes: this.props.upvotes,
            downvotes: this.props.downvotes
        }
    },
    propTypes: {
        review: React.PropTypes.string.isRequired,
        workload: React.PropTypes.string,
        upvotes: React.PropTypes.number.isRequired,
        downvotes: React.PropTypes.number.isRequired,
        sentiment_score: React.PropTypes.number.isRequired
    },
    componentDidMount() {
        this.setState({
            visibleText: this.trim(this.props.review)
        });
    },
    trim(data, maxLength = MAXLENGTH) {
        if (data.length < maxLength) return data;
        let trimmedData = data.substr(0, maxLength);
        return trimmedData.substr(0, trimmedData.lastIndexOf(' ')) + " ...";
    },
    addToFav() {
        this.setState({ isFav: !this.state.isFav });
    },
    upVote() {
        this.setState({
            isUpvoted: !this.state.isUpvoted,
            isDownvoted: this.state.isDownvoted && !this.state.isDownvoted
        })
    },
    downVote() {
        this.setState({
            isUpvoted: this.state.isUpvoted && !this.state.isUpvoted,
            isDownvoted: !this.state.isDownvoted
        })
    },
    handleExpand(){
        let text = this.state.isExpanded ? this.trim(this.props.review) : this.props.review;
        this.setState({
            visibleText: text,
            isExpanded: !this.state.isExpanded
        });
    },
    render() {
        var { review, upvotes, downvotes } = this.props;

        var favClass = cx({
            'ion-ios-heart': true,
            'highlight': this.state.isFav
        });

        var upvoteClass = cx({
            'ion-thumbsup': true,
            'highlight': this.state.isUpvoted
        });

        var downvoteClass = cx({
            'ion-thumbsdown': true,
            'highlight': this.state.isDownvoted
        });

        var buttonClass = cx({
            'button': true,
            'button-outlined': review.length > MAXLENGTH,
            'button-neutral': review.length < MAXLENGTH
        })

        return (
            <div className="reviewCard">
              <div className="review">
                <p> { this.state.visibleText } </p>
              </div>

              { this.props.workload ? 
                  <div className="workload">
                    <p> { this.props.workload } </p>
                  </div> : null 
              }

              <div className="review-actions">
                <button className={buttonClass}
                        onClick={this.handleExpand}
                        disabled={review.length < MAXLENGTH && 'disabled'} >
                        { this.state.isExpanded ? "Read Less" : "Read More" }
                </button>
                <ul>
                    <li onClick={this.addToFav}>
                        <i className={favClass}></i>
                    </li>
                    <li onClick={this.upVote}>
                        <i className={upvoteClass}></i> {upvotes}
                    </li>
                    <li onClick={this.downVote}>
                        <i className={downvoteClass}></i> {downvotes}
                    </li>
                </ul>
              </div>
            </div>
        )
    }
});

module.exports = ReviewCard;
