import React, { Component } from 'react'
import _ from 'lodash'
import { Grid, Dropdown } from 'semantic-ui-react'

class PantSides extends Component {
  constructor(props) {
    super(props)
    const { home, away } = this.props.products
    this.state = {
      sideOption: {
        home: home.pant.sideOption,
        away: away.pant.sideOption,
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    const { home, away } = nextProps.products
    const { activeTab } = nextProps.activeTab
    if (
      home.pant.sideOption !== this.props.products.home.pant.sideOption ||
      away.pant.sideOption !== this.props.products.away.pant.sideOption
    ) {
      return this.setState({
        value: {
          home: home.pant.sideOption,
          away: away.pant.sideOption,
        },
      })
    }

    if (activeTab !== this.props.activeTab) {
      this.setState({
        value: {
          home: home.pant.sideOption,
          away: away.pant.sideOption,
        },
      })
    }
  }

  handleChange = (e, { value }) => {
    this.setState({ sideOption: { [this.props.activeTab]: value } })
  }

  renderOptions = () => {
    const sideOption = this.state.sideOption[this.props.activeTab]

    switch (sideOption) {
      case 'pant_team_name':
        return <Grid.Row centered>Under Construction</Grid.Row>
      case 'pant_stripe':
        return <Grid.Row centered>Under Construction</Grid.Row>
      default:
        return <React.Component />
    }
  }
  render() {
    const { options } = _.find(this.props.products.panels, {
      key: 'pant-sides',
    })

    const sideOptions = options.map(option => {
      return { key: option.key, text: option.label, value: option.key }
    })

    const { activeTab } = this.props
    const sideOption = this.state.sideOption[activeTab]

    return (
      <Grid>
        <Grid.Row centered>
          <Dropdown
            options={sideOptions}
            value={sideOption}
            onChange={this.handleChange}
          />
        </Grid.Row>
        {this.renderOptions()}
      </Grid>
    )
  }
}

export default PantSides
