import React from "react";
import { connect } from "react-redux";

import { findTeams } from "../actions";

class SearchBar extends React.Component {
  state = { term: "" };

  onInputChange = event => {
    this.setState({ term: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.findTeams(this.state.term);
  };

  render() {
    return (
      <div className="search-bar ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <input
            type="text"
            value={this.state.term}
            onChange={this.onInputChange}
            placeholder="School Name, State"
          />
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { findTeams }
)(SearchBar);
