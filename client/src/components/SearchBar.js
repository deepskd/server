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
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div class="ui icon input">
            <input
              style={{ width: "600px" }}
              type="text"
              value={this.state.term}
              onChange={this.onInputChange}
              placeholder="School Name, State Code(optional)"
            />
            <i class="search icon" />
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { findTeams }
)(SearchBar);
