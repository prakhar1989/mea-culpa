var React = require('react');

var Header = React.createClass({
    render() {
        return (
            <div>
                <header className="demo-header mdl-layout__header mdl-layout__header--scroll mdl-color--grey-100 mdl-color-text--grey-800">
                <div className="mdl-layout__header-row">
                  <span className="mdl-layout-title">Mea Culpa</span>
                  <div className="mdl-layout-spacer"></div>
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                    <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
                      <i className="material-icons">search</i>
                    </label>
                    <div className="mdl-textfield__expandable-holder">
                      <input className="mdl-textfield__input" type="text" id="search" />
                      <label className="mdl-textfield__label" htmlFor="search">Enter your query...</label>
                    </div>
                  </div>
                </div>
              </header>
         </div>
      );
    }
});

module.exports = Header;
