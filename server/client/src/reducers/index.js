import { combineReducers } from "redux";

const teamsReducer = () => {
  return {};
};

const selectedTeamReducer = (team = null, action) => {
  if (action.type === "TEAM_SELECTED") {
    return teamsReducer().filter(t => t.name === action.payload);
  }

  return team;
};

export default combineReducers({
  teams: teamsReducer,
  selectedTeam: selectedTeamReducer
});
