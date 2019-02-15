import React from "react";
import ReactGA from "react-ga";
import { connect } from "react-redux";

import { findTeams } from "../actions";

class SearchBar extends React.Component {
  state = { term: "" };

  onInputChange = event => {
    this.setState({ term: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    ReactGA.event({
      category: "Find School",
      action: this.state.term
    });

    this.props.findTeams(this.state.term);
  };

  render() {
    return (
      <div className="ui column centered grid">
        <div className="twelve wide column">
          <div className="ui search">
            <form onSubmit={this.onFormSubmit} className="ui form">
              <div className="ui fluid action input">
                <input
                  type="text"
                  value={this.state.term}
                  onChange={this.onInputChange}
                  placeholder="School, State Code(optional)"
                />
                <button
                  className="ui primary icon button"
                  onClick={this.onFormSubmit}
                  type="submit"
                >
                  <i className="search icon" />
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { findTeams }
)(SearchBar);
