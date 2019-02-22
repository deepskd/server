import React from "react";
import { Button } from "semantic-ui-react";

class EmbellishmentSwitch extends React.Component {
  state = { embellishmentMethod: "heat_transfer" };

  handleHeatTransfer = () =>
    this.setState({ embellishmentMethod: "heat_transfer" });

  handleScreenPrint = () =>
    this.setState({ embellishmentMethod: "screen_print" });

  render() {
    const { embellishmentMethod } = this.state;

    return (
      <Button.Group fluid size="small">
        <Button
          positive={embellishmentMethod === "heat_transfer"}
          onClick={this.handleHeatTransfer}
        >
          Heat Transfer
        </Button>
        <Button.Or />
        <Button
          positive={embellishmentMethod === "screen_print"}
          onClick={this.handleScreenPrint}
        >
          Screen Print
        </Button>
      </Button.Group>
    );
  }
}

export default EmbellishmentSwitch;
