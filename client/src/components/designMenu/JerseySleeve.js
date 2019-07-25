import React, { Component } from 'react'
import _ from 'lodash'
import { Dropdown, Grid } from 'semantic-ui-react'

import { connect } from 'react-redux'

import { jerseySleeveUpdated } from '../../actions'

import TeamCrest from './TeamCrest'

class JerseySleeve extends Component {
  state = { value: 'none' }

  handleChange = (e, { value }) => {
    this.setState({ value })

    const props = {}
    props.uniformType = 'jersey'
    props.colorType = this.props.activeTab
    props.sleeveOption = value
    this.props.jerseySleeveUpdated(props)
  }

  renderOptions = () => {
    const { value } = this.state

    switch (value) {
      case 'jersey_team_crest':
        return (
          <Grid.Row>
            <TeamCrest
              products={this.props.products}
              activeTab={this.props.activeTab}
            />
          </Grid.Row>
        )
      default:
        return <React.Fragment />
    }
  }

  render() {
    const { options } = _.find(this.props.products.panels, {
      key: 'jersey-sleeve',
    })
    const sleeveOptions = options.map(option => {
      return { key: option.key, text: option.label, value: option.key }
    })

    const { value } = this.state

    return (
      <Grid>
        <Grid.Row>
          <Dropdown
            onChange={this.handleChange}
            options={sleeveOptions}
            value={value}
          />
        </Grid.Row>
        {this.renderOptions()}
      </Grid>
    )
  }
}

export default connect(
  null,
  { jerseySleeveUpdated }
)(JerseySleeve)
