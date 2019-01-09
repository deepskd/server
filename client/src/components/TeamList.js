import React from "react";
import { connect } from "react-redux";
import TeamItem from "./TeamItem";

class TeamList extends React.Component {
  renderTeams() {
    if (!this.props.teams) {
      return null;
    }
    return this.props.teams.map(team => {
      return <TeamItem key={team._id} team={team} />;
    });
  }

  render() {
    return (
      <div className="ui relaxed divided list" style={{ width: "600px" }}>
        {this.renderTeams()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    teams: state.teams
  };
};

export default connect(mapStateToProps)(TeamList);
