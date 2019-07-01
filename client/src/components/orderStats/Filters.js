import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class Filters extends Component {
  state = { country: this.props.country, Wholesale: true, Promotion: true }

  componentWillReceiveProps(nextProps) {
    if (nextProps.country !== this.state.country) {
      this.setState({
        Wholesale: true,
        Promotion: true,
      })
    }
  }

  handleAccountTypeChange = (e, { name }) => {
    const val = this.state[name]
    this.setState({ [name]: !val })
  }

  onFormSubmit = event => {
    event.preventDefault()
    const { Wholesale, Promotion } = this.state
    let retailerType = ''
    if (Wholesale) {
      retailerType += 'Wholesale'
    }
    if (Promotion) {
      retailerType += retailerType ? '|Promotion' : 'Promotion'
    }
    if (retailerType) {
      this.props.filters(retailerType)
    }
  }

  render() {
    const { Wholesale, Promotion } = this.state
    return (
      <Form>
        <Form.Checkbox
          name="Wholesale"
          label="Wholesale"
          checked={Wholesale}
          onChange={this.handleAccountTypeChange}
        />
        <Form.Checkbox
          name="Promotion"
          label="Promotion"
          checked={Promotion}
          onChange={this.handleAccountTypeChange}
        />
        <Form.Button type="submit" onClick={this.onFormSubmit}>
          Update
        </Form.Button>
      </Form>
    )
  }
}

export default Filters
