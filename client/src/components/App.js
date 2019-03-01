import React from "react";
import ReactGA from "react-ga";
import SearchBar from "./SearchBar";
import TeamList from "./TeamList";
import ProductList from "./ProductList";
import Header from "./header";
import OrderList from "./dashboard/OrderList";
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
        </div>
      </BrowserRouter>
    </div>
  );
};

function initializeReactGA() {
  console.log(process.env.REACT_APP_GA_CODE);
  ReactGA.initialize("UA-131840948-1");
  ReactGA.pageview("/homepage");
}

export default App;
