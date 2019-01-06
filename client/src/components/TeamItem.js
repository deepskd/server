import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { selectTeam } from "../actions";

class TeamItem extends React.Component {
  onTeamSelect(team) {
    this.props.selectTeam(team);
  }
  render() {
    return (
      <div className="item" onClick={() => this.onTeamSelect(this.props.team)}>
        <Link to="/school">
          <div className="header">
            <h4>{this.props.team.name}</h4>
          </div>
          <div className="right floated content">{this.props.team.mascot}</div>
          <div className="contents">
            {this.props.team.city},{this.props.team.state}
          </div>
        </Link>
      </div>
    );
  }
}

export default connect(
  null,
  { selectTeam }
)(TeamItem);
