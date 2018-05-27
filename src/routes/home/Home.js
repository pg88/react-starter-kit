import React from 'react';
import axios from 'axios';
import * as _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.goToLink = this.goToLink.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      userQuery: '',
      queryResults: [],
      hasResults: false,
      isEmptyQuery: null,
      searchInformation: {},
    };
  }
  handleChange(event) {
    this.setState({ userQuery: event.target.value });
    this.setState({ isEmptyQuery: false });
  }
  searchQuery() {
    if (!_.isEmpty(this.state.userQuery)) {
      this.setState({ isEmptyQuery: false });
      axios
        .get(
          `https://www.googleapis.com/customsearch/v1?key=AIzaSyAR82xZOpN0jmW5_WaT3WP6OUfYlvChoaU&cx=017576662512468239146:omuauf_lfve&q=${
            this.state.userQuery
          }`,
        )
        .then(res => {
          if (res) {
            if (_.size(res.data.items) > 0) {
              const queryResultsAPI = res.data.items;
              if (_.size(queryResultsAPI) > 0) {
                this.setState({ hasResults: true });
                this.setState({ queryResults: [_.head(queryResultsAPI)] });
                this.setState({
                  searchInformation: res.data.searchInformation,
                });
              }
            }
          }
        });
    } else {
      this.setState({ isEmptyQuery: true });
    }
  }
  goToLink(item) {
    if (item.link) {
      window.open(item.link, '_blank');
    }
  }

  render() {
    const hasResults = this.state.hasResults;
    const isEmptyQuery = this.state.isEmptyQuery;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h3>Search Engine Query - Google Custom Search API</h3>
          <div className="search-box">
            <input
              className="search-box--input"
              type="text"
              name="userQuery"
              onChange={this.handleChange}
            />
            <button className="search-box--button" onClick={this.searchQuery}>
              search
            </button>
          </div>
          {isEmptyQuery ? (
            <div> The query must have at least one character. </div>
          ) : (
            ''
          )}
          {hasResults ? (
            <div>
              <small>
                About {this.state.searchInformation.formattedTotalResults}{' '}
                results ({this.state.searchInformation.formattedSearchTime}{' '}
                seconds)
              </small>
              <hr />
              {this.state.queryResults.map((item, index) => (
                <div key={index}>
                  <h4 style={{ padding: 0, margin: 0 }}>{item.htmlTitle}</h4>
                  <span>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.htmlSnippet }}
                    />
                    <a onClick={() => this.goToLink(item)}>
                      {item.htmlFormattedUrl}
                    </a>
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {isEmptyQuery ? (
                <span>
                  No results found for your query:{' '}
                  <strong>{this.state.userQuery}</strong>{' '}
                </span>
              ) : (
                ''
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
