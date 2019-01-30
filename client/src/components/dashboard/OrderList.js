import React from "react";
import OrderItem from "./OrderItem";

class OrderList extends React.Component {
  render() {
    return (
      <div className="ui relaxed diveded List">
        <OrderItem />
      </div>
    );
  }
}

export default OrderList;
