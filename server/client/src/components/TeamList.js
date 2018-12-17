import React from "react";
import { connect } from "react-redux";
import { findTeams } from "../actions";
import { Link } from "react-router-dom";

class TeamList extends React.Component {
  componentDidMount() {
    // this.props.findTeams();
  }

  schoolSelected(event) {
    console.log(event);
  }

  renderTeams() {
    if (!this.props.teams) {
      return null;
    }
    return this.props.teams.map(team => {
      return (
        <div className="item" key={team._id} onClick={this.schoolSelected}>
          <Link to="/school">
            <div className="header">
              <h4>{team.name}</h4>
            </div>
            <div className="right floated content">{team.mascot}</div>
            <div className="contents">
              {team.city},{team.state}
            </div>
          </Link>
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
