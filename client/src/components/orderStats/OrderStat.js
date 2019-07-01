import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getOrderStats } from '../../actions/actionsOrderStats'

import { Grid, Header } from 'semantic-ui-react'

import CountrySelector from './CountrySelector'
import BarGraph from './BarGraph'

class App extends Component {
  componentDidMount() {
    this.props.getOrderStats()
  }
  render() {
    const { stats } = this.props
    if (Object.keys(stats).length === 0) {
      return <div>Loading</div>
    }
    return (
      <Grid centered columns={1}>
        <Grid.Column>
          <Header as="h3">miTeam Order Stats since Jan 01, 2016</Header>
        </Grid.Column>
        <Grid.Column>
          <CountrySelector />
        </Grid.Column>
        <BarGraph />
        <Grid.Column />
      </Grid>
    )
  }
}

const mapStateToProps = ({ orderStats }) => {
  return { stats: orderStats }
}

export default connect(
  mapStateToProps,
  { getOrderStats }
)(App)
