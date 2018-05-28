import React from 'react';

import * as _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import API from "../../api/index"
import s from './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.goToLink = this.goToLink.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      userQuery: '',
      apiError: null,
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
      API.get(`&q=${this.state.userQuery}`)
          .then(res => {
            if (res) {
              if (_.size(res.data.items) > 0) {
                const queryResultsAPI = res.data.items;
                if (_.size(queryResultsAPI) > 0) {
                  this.setState({ hasResults: true });
                  this.setState({ queryResults: [_.head(queryResultsAPI)] });
                  this.setState({
                    searchInformation: res.data.searchInformation
                  });
                }
              }
            }
          })
          .catch((error) => {
            if (error.response) {
              this.setState({ apiError: error.response });
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
    const apiError = this.state.apiError;
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
          { apiError ? (<div><br/>  Something went wrong :(. <br/> <br/> <small>Error code:{this.state.apiError.data.error.code} -- {this.state.apiError.data.error.message}</small> </div>) : ""}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
