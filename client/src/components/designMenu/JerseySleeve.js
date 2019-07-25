import React, { Component } from 'react'
import _ from 'lodash'
import { Dropdown, Grid } from 'semantic-ui-react'

import { connect } from 'react-redux'

import { jerseySleeveUpdated } from '../../actions'

import TeamCrest from './TeamCrest'

class JerseySleeve extends Component {
  constructor(props) {
    super(props)
    const { home, away } = this.props.products
    this.state = {
      value: {
        home: home.jersey.sleeveOption,
        away: away.jersey.sleeveOption,
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    const { home, away } = nextProps.products
    const { activeTab } = nextProps.activeTab
    if (
      home.jersey.sleeveOption !==
        this.props.products.home.jersey.sleeveOption ||
      away.jersey.sleeveOption !== this.props.products.away.jersey.sleeveOption
    ) {
      return this.setState({
        value: {
          home: home.jersey.sleeveOption,
          away: away.jersey.sleeveOption,
        },
      })
    }

    if (activeTab !== this.props.activeTab) {
      this.setState({
        value: {
          home: home.jersey.sleeveOption,
          away: away.jersey.sleeveOption,
        },
      })
    }
  }

  handleChange = (e, { value }) => {
    this.setState({ value: { [this.props.activeTab]: value } })

    const props = {}
    props.uniformType = 'jersey'
    props.colorType = this.props.activeTab
    props.sleeveOption = value
    this.props.jerseySleeveUpdated(props)
  }

  renderOptions = () => {
    const value = this.state.value[this.props.activeTab]

    switch (value) {
      case 'jersey_team_crest':
        return (
          <Grid.Row centered>
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

    const value = this.state.value[this.props.activeTab]

    return (
      <Grid>
        <Grid.Row centered>
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
