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
        <div className="header">
          <h4>{this.props.team.name}</h4>
        </div>
        <div className="right floated content">{this.props.team.mascot}</div>
        <div className="contents">
          {this.props.team.city},{this.props.team.state}
        </div>
        <div className="ui horizontal list">
          <div className="item">
            <Link to="/football">
              <i class="football ball icon" />
              Football
            </Link>
          </div>
          <div className="item">
            <Link to="/basketball">
              <i class="basketball ball icon" />
              BasketBall
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { selectTeam }
)(TeamItem);
