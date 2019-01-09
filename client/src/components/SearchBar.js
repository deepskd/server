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
      <div className="ui search">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>Search for US High Schools</label>
            <input
              className="prompt"
              style={{ width: "600px" }}
              type="text"
              value={this.state.term}
              onChange={this.onInputChange}
              placeholder="School Name, State Code(optional)"
            />
            <button
              className="ui primary button"
              style={{ margin: "0px 0px 0px 5px" }}
              onClick={this.onFormSubmit}
              type="submit"
            >
              Submit
            </button>
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
