import React from 'react'
import ReactGA from 'react-ga'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/actionsAuth'

import SearchBar from './SearchBar'
import TeamList from './TeamList'
import ProductList from './ProductList'
import TeamHeader from './TeamHeader'
// import OrderList from './dashboard/OrderList'
import ImageStats from './images/ImageStats'
import TeamImageStats from './images/TeamImageStats'
import Order from './orders/Order'
import OrderStats from './orderStats/OrderStat'
import Teams from './teams/Teams'
import TeamsNew from './teams/TeamsNew'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Container } from 'semantic-ui-react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.initializeReactGA()
  }
  initializeReactGA = () => {
    ReactGA.initialize(process.env.REACT_APP_GA_CODE)
    ReactGA.pageview('/homepage')
  }

  componentDidMount() {
    this.props.fetchUser()
  }
  render() {
    return (
      <Container>
        <BrowserRouter>
          <React.Fragment>
            <TeamHeader />
            <Route path="/" exact component={SearchBar} />
            <Route path="/" exact component={TeamList} />
            <Route path="/teams" exact component={Teams} />
            <Switch>
              <Route path="/teams/new" exact component={TeamsNew} />
              <Route path="/:sports/:id" component={ProductList} />
            </Switch>
            <Route path="/retailerImages" component={ImageStats} />
            <Route path="/teamImages" component={TeamImageStats} />
            <Route path="/orders" component={Order} />
            <Route path="/orderStats" component={OrderStats} />
          </React.Fragment>
        </BrowserRouter>
      </Container>
    )
  }
}

export default connect(
  null,
  { fetchUser }
)(App)
