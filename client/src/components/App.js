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

import { BrowserRouter, Route } from 'react-router-dom'

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
            <Route path="/:sports/:id" component={ProductList} />
            <Route path="/retailerImages" exact component={ImageStats} />
            <Route path="/teamImages" exact component={TeamImageStats} />
            <Route path="/orders" exact component={Order} />
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
