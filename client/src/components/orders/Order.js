import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input } from "semantic-ui-react";
import { findOrder } from "../../actions/actionsOrders";
import OrderList from "./OrderList";

class Order extends Component {
  state = { term: "" };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.findOrder(this.state.term);
  };

  onInputChange = event => {
    this.setState({ term: event.target.value });
  };
  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.onFormSubmit}>
          <Input
            action="Search"
            placeholder="Search"
            value={this.state.term}
            onChange={this.onInputChange}
          />
        </Form>
        <OrderList />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { findOrder }
)(Order);
