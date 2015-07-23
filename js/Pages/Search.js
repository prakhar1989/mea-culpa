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
            },
            loadingSearch: false,
            query: ""
        }
    },
    handleKeyPress(e) {
        let query = this.refs.search.getDOMNode().value;
        if (query.length > 2) {

            // signal search call init
            this.setState({
                loadingSearch: true,
                query: query
            });

            Api.getSearchResults(query)
               .then((data) => {
                   let { courses, departments, professors } = data.data;
                   this.setState({
                       searchResults: {
                           courses: courses,
                           departments: departments,
                           professors: professors
                       },
                       loadingSearch: false,
                   });
               });
        }
    },
    renderResults(title, data) {
        var items = data.map((d, i) => 
            <li key={i}>
                <a href={"/#/" + title + "/" + d.id}>{d.name}</a>
            </li>
        );

        var noResults = <li>No results found</li>;

        return (
            <section className="results">
                <h6>{title}</h6>
                <ul>{items.length > 0 ? items : noResults}</ul>
            </section>
        );
    },
    render() {
        let results;

        if (this.state.query.length > 0) {
            // map over the keys and collect results
            results = ["departments", "professors", "courses"].map((x, i) =>
                <div key={i}>
                    {this.renderResults(x, this.state.searchResults[x])}
                </div>
            );
        }

        return <div className="search-page">
            <div className='form-element'>
                   <label htmlFor='search'>What are you looking for?</label>
                   <input type='text' id='search' ref="search" 
                          onKeyPress={debounce(this.handleKeyPress, 300)}
                          placeholder='Enter a course, professor, or a department'
                          className='form-input' />
            </div>
            <div className="search-results">
                { this.state.loadingSearch ? <p>Fetching results ... </p> : results }
            </div>
        </div>;
    }
});

module.exports = Search;
