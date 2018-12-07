export const findTeam = team => {
  return {
    type: "FIND_TEAM",
    payload: team
  };
};
