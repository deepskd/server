import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input } from 'semantic-ui-react'
import { findOrder } from '../../actions/actionsOrders'
import OrderList from './OrderList'

class Order extends Component {
  state = { term: '', retailerId: '' }

  onFormSubmit = event => {
    event.preventDefault()
    const { term, retailerId } = this.state
    this.props.findOrder({ term, retailerId })
  }

  onInputChange = (event, obj) => {
    console.log(obj)
    this.setState({ [obj.name]: event.target.value })
  }
  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              action="Search"
              name="term"
              placeholder="Order Name"
              value={this.state.term}
              onChange={this.onInputChange}
            />
            <Form.Input
              name="retailerId"
              value={this.state.retailerId}
              onChange={this.onInputChange}
            />
          </Form.Group>
        </Form>
        <OrderList />
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  { findOrder }
)(Order)
