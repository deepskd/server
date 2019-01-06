import React from "react";
import SearchBar from "./SearchBar";
import TeamList from "./TeamList";
import SchoolDetail from "./SchoolDetail";
import { BrowserRouter, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Route path="/" exact component={SearchBar} />
          <Route path="/" exact component={TeamList} />
          <Route path="/school" component={SchoolDetail} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
