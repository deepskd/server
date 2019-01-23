import React from "react";
import ReactGA from "react-ga";
import SearchBar from "./SearchBar";
import TeamList from "./TeamList";
import SchoolDetail from "./SchoolDetail";
import Header from "./header";
import NCAASearchBar from "./ncaa/NCAASearchBar";
import { BrowserRouter, Route } from "react-router-dom";

const App = () => {
  initializeReactGA();
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={SearchBar} />
          <Route path="/" exact component={TeamList} />
          <Route path="/school" component={SchoolDetail} />
          <Route path="/ncaa" exact component={NCAASearchBar} />
        </div>
      </BrowserRouter>
    </div>
  );
};

function initializeReactGA() {
  ReactGA.initialize("UA-131840948-1");
  ReactGA.pageview("/homepage");
}

export default App;
