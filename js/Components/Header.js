var React = require('react');

var Header = React.createClass({
    render() {
        return <header id="banner">
            <div className="container">
              <h1><a href="/#/">Mea Culpa</a></h1>
            </div>
          </header>
    }
});

module.exports = Header;
