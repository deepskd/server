import React from "react";
import SearchBar from "./SearchBar";
import TeamList from "./TeamList";

const App = () => {
  return (
    <div className="ui container">
      <SearchBar />
      <TeamList />
    </div>
  );
};

export default App;
