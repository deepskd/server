import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Grid, Dropdown } from 'semantic-ui-react'

import { jerseySleeveUpdated } from '../../actions'

class SleeveStripe extends Component {
  constructor(props) {
    super(props)
    const { home, away } = this.props.products
    this.state = {
      sleeveStripe: {
        home: home.jersey.sleeveStripe,
        away: away.jersey.sleeveStripe,
      },
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { home, away } = nextProps.products
    const { activeTab } = nextProps.activeTab
    if (
      home.jersey.sleeveStripe !==
        this.props.products.home.jersey.sleeveStripe ||
      away.jersey.sleeveStripe !== this.props.products.away.jersey.sleeveStripe
    ) {
      return this.setState({
        sleeveStripe: {
          home: home.jersey.sleeveStripe,
          away: away.jersey.sleeveStripe,
        },
      })
    }

    if (activeTab !== this.props.activeTab) {
      this.setState({
        sleeveStripe: {
          home: home.jersey.sleeveStripe,
          away: away.jersey.sleeveTypeKey,
        },
      })
    }
  }
  handleChange = (e, { value }) => {
    const { activeTab } = this.props

    this.setState({
      sleeveStripe: { [activeTab]: value },
    })

    const props = {}
    props.uniformType = 'jersey'
    props.colorType = activeTab
    props.sleeveOption = 'jersey_sleeve_stripe'
    props.sleeveStripe = value
    this.props.jerseySleeveUpdated(props)
  }

  render() {
    const { sleeveStripe } = this.state
    const { activeTab } = this.props

    const panelOptions = _.chain(this.props.products.panels)
      .find({ key: 'jersey-sleeve' })
      .value()

    const sleeveOptions = _.find(panelOptions.options, {
      key: 'jersey_sleeve_stripe',
    }).options.map(option => {
      return { key: option.key, text: option.label, value: option.url }
    })

    let stripe = _.find(sleeveOptions, { value: sleeveStripe[activeTab] })
    if (!stripe) {
      stripe = sleeveOptions[0]
    }

    return (
      <React.Fragment>
        <Grid>
          <Grid.Row centered>
            <Dropdown
              onChange={this.handleChange}
              options={sleeveOptions}
              value={stripe.value}
            />
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  { jerseySleeveUpdated }
)(SleeveStripe)
