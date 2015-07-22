var React = require('react');

var Header = React.createClass({
    render() {
        return <header id="banner">
            <div className="container">
              <h3><a href="/#/">Mea Culpa</a></h3>
            </div>
          </header>
    }
});

module.exports = Header;
