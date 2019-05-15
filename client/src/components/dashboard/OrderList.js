import React from "react";
import OrderItem from "./OrderItem";
import { ORDERS } from "./orders";
import { Menu, Segment } from "semantic-ui-react";
import ReactGA from "react-ga";

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "open"
    };
  }
  renderOrders = () => {
    const { activeTab } = this.state;
    return ORDERS.filter(order => order.status.toLowerCase() === activeTab).map(
      order => {
        return (
          <Segment color="black" key={order.orderNo}>
            <OrderItem key={order.orderNo} order={order} />
          </Segment>
        );
      }
    );
  };
  componentDidMount() {
    ReactGA.pageview("/dashboard");
  }
  render() {
    const { activeTab } = this.state;
    return (
      <React.Fragment>
        <Menu attached="top" tabular>
          <Menu.Item
            name="open"
            active={activeTab === "open"}
            onClick={() => this.setState({ activeTab: "open" })}
          />
          <Menu.Item
            name="delivered"
            active={activeTab === "delivered"}
            onClick={() => this.setState({ activeTab: "delivered" })}
          />
        </Menu>

        <Segment.Group>{this.renderOrders()}</Segment.Group>
      </React.Fragment>
    );
  }
}

export default OrderList;
