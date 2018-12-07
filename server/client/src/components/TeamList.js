import React from "react";
import { connect } from "react-redux";
import { findTeams } from "../actions";

class TeamList extends React.Component {
  componentDidMount() {
    this.props.findTeams();
  }
  render() {
    return <div>Team List</div>;
  }
}

// const mapStateToProps = state => {
//   return {
//     x: ""
//   };
// };

export default connect(
  null,
  { findTeams }
)(TeamList);
