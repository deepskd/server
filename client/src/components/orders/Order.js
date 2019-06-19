import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Divider } from 'semantic-ui-react'
import { findOrder } from '../../actions/actionsOrders'
import OrderList from './OrderList'

const options = [
  { key: 100141, text: 'Athletic Supply', value: 100141 },
  { key: 100535, text: 'MB2', value: 100535 },
  { key: 100226, text: 'Athletics Unlimited', value: 100226 },
  { key: 100132, text: 'Bumblebee', value: 100132 },
  { key: 100142, text: 'Cardinal Sports', value: 100142},
  { key: 200838, text: 'Barcelona Sporting Goods', value: 200838},
  { key: 100820, text: 'Athletic Shop', value: 100820}
]

class Order extends Component {
  state = { orderName: '', retailerId: '', article: '' }

  onFormSubmit = event => {
    event.preventDefault()
    const { orderName, retailerId, article } = this.state
    this.props.findOrder({ orderName, retailerId, article })
  }

  onInputChange = (event, {name, value}) => {
    this.setState({ [name]: value })
  }

 
  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Group widths="equal">
            <Form.Dropdown
              name="retailerId"
              placeholder="Retailer"
              label="Retailer"
              value={this.state.retailerId}
              onChange={this.onInputChange}
              options={options}
              clearable
              selection
            />
            <Form.Input
              name="article"
              label="Article No"
              placeholder="Article No"
              value={this.state.article}
              onChange={this.onInputChange}
            />
            <Form.Input
              name="orderName"
              label="Order Name"
              placeholder="Order Name"
              value={this.state.orderName}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Button primary type="submit">Find Orders</Button>
        </Form>
        <Divider />
        <OrderList />
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  { findOrder }
)(Order)
