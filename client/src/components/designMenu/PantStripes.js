import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Grid, Dropdown } from 'semantic-ui-react'

import { pantSideUpdated } from '../../actions'

class PantStripes extends Component {
  constructor(props) {
    super(props)
    const { home, away } = this.props.products
    this.state = {
      sideStripe: {
        home: home.pant.sideStripe,
        away: away.pant.sideStripe,
      },
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { home, away } = nextProps.products
    const { activeTab } = nextProps.activeTab
    if (
      home.pant.sideStripe !== this.props.products.home.pant.sideStripe ||
      away.pant.sideStripe !== this.props.products.away.pant.sideStripe
    ) {
      return this.setState({
        sideStripe: {
          home: home.pant.sideStripe,
          away: away.pant.sideStripe,
        },
      })
    }

    if (activeTab !== this.props.activeTab) {
      this.setState({
        sideStripe: {
          home: home.pant.sideStripe,
          away: away.pant.sideStripe,
        },
      })
    }
  }
  handleChange = (e, { value }) => {
    const { activeTab } = this.props

    this.setState({
      sideStripe: { [activeTab]: value },
    })

    const props = {}
    props.uniformType = 'pant'
    props.colorType = activeTab
    props.sideOption = 'pant_stripe'
    props.sideStripe = value

    this.props.pantSideUpdated(props)
  }

  render() {
    const { sideStripe } = this.state
    const { activeTab } = this.props

    const panelOptions = _.chain(this.props.products.panels)
      .find({ key: 'pant-sides' })
      .value()

    const stripeOptions = _.find(panelOptions.options, {
      key: 'pant_stripe',
    }).options.map(option => {
      return { key: option.key, text: option.label, value: option.url }
    })

    return (
      <React.Fragment>
        <Grid>
          <Grid.Row centered>
            <Dropdown
              onChange={this.handleChange}
              options={stripeOptions}
              value={sideStripe[activeTab]}
            />
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  { pantSideUpdated }
)(PantStripes)
