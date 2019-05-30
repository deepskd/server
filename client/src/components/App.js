import React from "react";
import ReactGA from "react-ga";
import SearchBar from "./SearchBar";
import TeamList from "./TeamList";
import ProductList from "./ProductList";
import Header from "./Header";
import OrderList from "./dashboard/OrderList";
import ImageStats from "./images/ImageStats";
import TeamImageStats from "./images/TeamImageStats";

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
          <Route path="/:sports/:id" component={ProductList} />
          <Route path="/dashboard" exact component={OrderList} />
          <Route path="/retailerImages" exact component={ImageStats} />
          <Route path="/teamImages" exact component={TeamImageStats} />
        </div>
      </BrowserRouter>
    </div>
  );
};

function initializeReactGA() {
  ReactGA.initialize(process.env.REACT_APP_GA_CODE);
  ReactGA.pageview("/homepage");
}

export default App;
