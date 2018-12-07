import React from "react";
import { connect } from "react-redux";

import { findTeam } from "../actions";

class SearchBar extends React.Component {
  onFormSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="search-bar ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <input type="text " />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { teams: state.teams };
};

export default connect(
  mapStateToProps,
  { findTeam }
)(SearchBar);
