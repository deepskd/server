import React, { Component } from "react";
import { connect } from "react-redux";

import { Card, Image } from "semantic-ui-react";

class OrderList extends Component {
  renderOrders = orders => {
    return orders.map(order => {
      return (
        <Card key={order.id}>
          <Image src={order.productPreviewURL} />
        </Card>
      );
    });
  };
  render() {
    const { orders } = this.props;
    if (orders.length === 0) {
      return <div />;
    }
    return <Card.Group itemsPerRow={4}>{this.renderOrders(orders)}</Card.Group>;
  }
}

const mapStateToProps = ({ orders }) => {
  return { orders };
};

export default connect(mapStateToProps)(OrderList);
