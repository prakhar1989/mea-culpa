var React = require('react');
var cx = require('classnames');

const MAXLENGTH = 500;

// takes a score and returns a twitter emoji URL
function getEmoticon(score) {
    if (score < -5) {
        return "http://twemoji.maxcdn.com/72x72/1f623.png"
    } else if (score < 0) {
        return "http://twemoji.maxcdn.com/72x72/1f614.png"
    } else if (score < 10) {
        return "http://twemoji.maxcdn.com/72x72/1f615.png"
    } else if (score < 18) {
        return "http://twemoji.maxcdn.com/72x72/1f600.png"
    } else {
        return "http://twemoji.maxcdn.com/72x72/1f60d.png"
    }
}

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
    formatDate(dateStr) {
        let d = new Date(Date.parse(dateStr));
        // This is a shitty hack to compensate for the fact that
        // there's no strftime function in JS >.<
        let [day, month, date, year] = d.toDateString().split(' ');
        return `${date} ${month}, ${year}`
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
            <div className="review-card">

            <div className='grid-flex-container'>
                <div className='grid-flex-cell'>
                    <h2> Professor </h2>
                    <p><a href="/#/professor/12">Lorem Ipsum</a></p>
                    <p className="date"> Posted on {this.formatDate(this.props.created)}</p>
                </div>
                <div className='grid-flex-cell'>
                    <h2> Sentiment </h2>
                    <img src={getEmoticon(this.props.sentiment_score)} height="24" width="24" />
                </div>
            </div>
                
              <div className="review">
                <h2> Review </h2>
                <p> { this.state.visibleText } </p>
              </div>

              { this.props.workload ? 
                  <div className="workload">
                    <h2> Workload </h2>
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
