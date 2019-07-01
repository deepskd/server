import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getOrderStats } from '../../actions'

import { Grid, Dropdown, GridColumn } from 'semantic-ui-react'
import Filters from './Filters'

const countryOptions = [
  { key: 'au', value: 'AU', flag: 'au', text: 'Australia' },
  { key: 'at', value: 'AT', flag: 'at', text: 'Austria' },
  { key: 'ca', value: 'CA', flag: 'ca', text: 'Canada' },
  { key: 'ch', value: 'CH', flag: 'ch', text: 'Switzerland' },
  { key: 'cz', value: 'CZ', flag: 'cz', text: 'Czech Republic' },
  { key: 'de', value: 'DE', flag: 'de', text: 'Germany' },
  { key: 'es', value: 'ES', flag: 'es', text: 'Spain' },
  { key: 'fi', value: 'FI', flag: 'fi', text: 'Finland' },
  { key: 'fr', value: 'FR', flag: 'fr', text: 'France' },
  { key: 'gb', value: 'GB', flag: 'gb', text: 'Great Britain' },
  { key: 'hb', value: 'HB', flag: '', text: 'HBS' },
  { key: 'it', value: 'IT', flag: 'it', text: 'Italy' },
  { key: 'jp', value: 'JP', flag: 'jp', text: 'Japan' },
  { key: 'nl', value: 'NL', flag: 'nl', text: 'Netherlands' },
  { key: 'no', value: 'NO', flag: 'no', text: 'Norway' },
  { key: 'nz', value: 'NZ', flag: 'nz', text: 'New Zealand' },
  { key: 'pl', value: 'PL', flag: 'pl', text: 'Poland' },
  { key: 'se', value: 'SE', flag: 'se', text: 'Sweeden' },
  { key: 'sk', value: 'SK', flag: 'sk', text: 'Slovakia' },
  { key: 'us', value: 'US', flag: 'us', text: 'United States' },
]

class CountrySelector extends Component {
  state = { value: 'US' }

  handleChange = (e, { value }) => {
    this.props.getOrderStats(value)
    this.setState({ value })
  }

  handleFilter = retailerType => {
    this.props.getOrderStats(this.state.value, retailerType)
  }

  render() {
    const { value } = this.state
    return (
      <Grid columns={1}>
        <Grid.Column>
          <Dropdown
            options={countryOptions}
            selection
            search
            placeholder="Select Country"
            onChange={this.handleChange}
            value={value}
          />
        </Grid.Column>
        <GridColumn>
          <Filters country={value} filters={this.handleFilter} />
        </GridColumn>
      </Grid>
    )
  }
}

export default connect(
  null,
  { getOrderStats }
)(CountrySelector)
