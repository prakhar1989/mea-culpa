var React = require('react');
var cx = require('classnames');
var Emoticons = require('../Utils/Emoticon.js');

const MAXLENGTH = 500;

// takes a score and returns a twitter emoji URL
function getEmoticon(score) {
    if (score < -5) {
        return Emoticons.DEPRESSING
    } else if (score < 0) {
        return Emoticons.SAD
    } else if (score < 10) {
        return Emoticons.NEUTRAL
    } else if (score < 18) {
        return Emoticons.HAPPY
    } else {
        return Emoticons.LOVE
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
        let [_, month, date, year] = d.toDateString().split(' ');
        return `${date} ${month}, ${year}`
    },
    render() {
        var { upvotes, downvotes } = this.props;

        var upvoteClass = cx({
            'ion-thumbsup': true,
            'highlight': this.state.isUpvoted
        });

        var downvoteClass = cx({
            'ion-thumbsdown': true,
            'highlight': this.state.isDownvoted
        });

        return (
            <div className="review-card">

            <div className='grid-flex-container'>
                <div className='grid-flex-cell'>
                    <h2> Professor </h2>
                    <p><a href="/#/professor/12">Lorem Ipsum</a></p>
                </div>
                <div className='grid-flex-cell'>
                    <h2> Sentiment </h2>
                    <img src={getEmoticon(this.props.sentiment_score)} height="24" width="24" />
                </div>
            </div>
                
              <div className="review">
                <h2> Review </h2>
                <p> { this.state.visibleText } </p>
                {this.state.isExpanded ? 
                    <a onClick={this.handleExpand}>Read Less</a> : 
                    <a onClick={this.handleExpand}>Read More</a> }
              </div>

              { this.props.workload ? 
                  <div className="workload">
                    <h2> Workload </h2>
                    <p> { this.props.workload } </p>
                  </div> : null 
              }

              <div className="review-actions grid-flex-container">
                    <div className='grid-flex-cell'>
                        <p className="date"> <i className="ion-android-time"></i> {this.formatDate(this.props.created)}</p>
                    </div>
                    <div className='grid-flex-cell'>
                    <ul>
                        <li onClick={this.upVote}>
                            <i className={upvoteClass}></i> {upvotes}
                        </li>
                        <li onClick={this.downVote}>
                            <i className={downvoteClass}></i> {downvotes}
                        </li>
                    </ul>
                    </div>
              </div>
            </div>
        )
    }
});

module.exports = ReviewCard;
