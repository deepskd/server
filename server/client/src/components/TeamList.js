import React from "react";
import { connect } from "react-redux";
import { findTeams } from "../actions";

class TeamList extends React.Component {
  componentDidMount() {
    this.props.findTeams();
  }
  renderTeams() {
    return this.props.teams.map(team => {
      return (
        <div className="item" key={team._id}>
          <div className="header">
            <h3>{team.name}</h3>
          </div>
          <div className="right floated content">{team.mascot}</div>
          <div className="contents">
            {team.city},{team.state}
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="ui relaxed divided list">{this.renderTeams()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    teams: state.teams
  };
};

export default connect(
  mapStateToProps,
  { findTeams }
)(TeamList);
