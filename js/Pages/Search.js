var React = require('react');
var Router = require('react-router');
var Api = require('../Utils/Api');
var debounce = require('lodash/function/debounce');

var Search = React.createClass({
    getInitialState() {
        return {
            searchResults: {
                courses: [],
                departments: [],
                professors: []
            }
        }
    },
    handleKeyPress(e) {
        let query = this.refs.search.getDOMNode().value;
        if (query.length > 2) {
            Api.getSearchResults(query)
               .then((data) => {
                   let { courses, departments, professors } = data.data;
                   this.setState({
                       searchResults: {
                           courses: courses,
                           departments: departments,
                           professors: professors
                       }
                   });
               });
        }
    },
    renderResults(title, data) {
        var items = data.map((d, i) => 
            <li key={i}>
                <a href={"/#/" + title.toLowerCase() + "/" + d.id}>{d.name}</a>
            </li>
        );
        if (data.length === 0) return null;
        return (
            <section className="results">
                <h6>{title}</h6>
                <ul>{items}</ul>
            </section>
        );
    },
    render() {
        let { courses, departments, professors } = this.state.searchResults;
        return <div>
            <div className='form-element'>
                   <label htmlFor='search'>Search</label>
                   <input type='text' id='search' ref="search" 
                          onKeyPress={debounce(this.handleKeyPress, 500)}
                          placeholder='Enter a course, professor, or a department'
                          className='form-input' />
            </div>
            <div className="search-results">
                { this.renderResults("Departments", departments) }
                { this.renderResults("Courses", courses) }
                { this.renderResults("Professors", professors) }
            </div>
        </div>;
    }
});

module.exports = Search;
