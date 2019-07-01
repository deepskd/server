import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { findOrder } from '../../actions/actionsOrders'

import OrderImage from './OrderImage'
import { Card, Grid, Pagination } from 'semantic-ui-react'

class OrderList extends Component {
  state = { selectedOrders: [], term: '', activePage:1 }

  renderOrders = ({data}) => {
    return data.map(order => {
      return (
        <Card key={order._id}>
          <OrderImage
            src={order.productPreviewURL.replace('$configLarge$', 'wid=201')}
          />
        </Card>
      )
    })
  }

  handlePaginationChange = (e,{activePage}) =>{
    this.setState({activePage})
    const { orderName, retailerId, article } = this.props.formData
    this.props.findOrder({ orderName, retailerId, article, activePage })
  }
  render() {
    const { orders } = this.props
    if (_.isEmpty(orders)) {
      return <div />
    }
    
    const totalPages = orders.count ? ( Number.parseInt(orders.count / 32 )) + 1 : 1
    return (
      <Grid columns={1}>
        <Grid.Column floated="left" width={5}>
          <Pagination
            size="mini"
            activePage={this.state.activePage}
            onPageChange={this.handlePaginationChange}
            totalPages={totalPages}
          />

        </Grid.Column>
        <Grid.Column>
          <Card.Group itemsPerRow={4}>{this.renderOrders(orders)}</Card.Group>
        </Grid.Column>
      </Grid>
    
    )
  }
}

const mapStateToProps = ({ orders }) => {
  return { orders }
}

export default connect(mapStateToProps,{findOrder})(OrderList)
