import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, Image, Button } from 'semantic-ui-react'

class OrderList extends Component {
  state = { selectedOrders: [], term: '' }

  renderOrders = orders => {
    return orders.map(order => {
      return (
        <Card key={order._id}>
          <Image
            src={order.productPreviewURL.replace('$configLarge$', 'wid=201')}
          />
        </Card>
      )
    })
  }
  render() {
    const { orders } = this.props
    if (orders.length === 0) {
      return <div />
    }
    return <Card.Group itemsPerRow={4}>{this.renderOrders(orders)}</Card.Group>
  }
}

const mapStateToProps = ({ orders }) => {
  return { orders }
}

export default connect(mapStateToProps)(OrderList)
