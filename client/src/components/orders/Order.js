import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Divider } from 'semantic-ui-react'
import { findOrder } from '../../actions/actionsOrders'
import OrderList from './OrderList'

class Order extends Component {
  state = { orderName: '', retailerId: '', article: '' }

  onFormSubmit = event => {
    event.preventDefault()
    const { orderName, retailerId, article } = this.state
    this.props.findOrder({ orderName, retailerId, article })
  }

  onInputChange = (event, obj) => {
    this.setState({ [obj.name]: event.target.value })
  }
  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              name="orderName"
              placeholder="Order Name"
              value={this.state.orderName}
              onChange={this.onInputChange}
            />
            <Form.Input
              name="retailerId"
              value={this.state.retailerId}
              onChange={this.onInputChange}
            />
            <Form.Input
              name="article"
              value={this.state.article}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Button type="submit">Find Orders</Button>
        </Form>
        <OrderList />
        <Divider />
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  { findOrder }
)(Order)
