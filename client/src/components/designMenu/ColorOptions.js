import React from "react";
import { Menu, Segment, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";

class ColorOptions extends React.Component {
  constructor(props) {
    super(props);
    const { home, colors } = this.props.products;
    this.state = {
      activeTab: "home",
      textColor: colors[home.jersey.textColorCode],
      strokeColor: colors[home.jersey.strokeColorCode]
    };
  }

  handleColorChange(obj, c) {
    const { activeTab } = this.state;
    const { home, away, colors } = this.props.products;
    if (activeTab === "home") {
      const textColor = obj === "text" ? c : colors[home.jersey.textColorCode];
      const strokeColor =
        obj === "stroke" ? c : colors[home.jersey.strokeColorCode];
      this.setState({
        activeTab: "home",
        textColor: textColor,
        strokeColor: strokeColor
      });
    } else if (activeTab === "away") {
      const textColor = obj === "text" ? c : colors[away.jersey.textColorCode];
      const strokeColor =
        obj === "stroke" ? c : colors[away.jersey.strokeColorCode];
      this.setState({
        activeTab: "away",
        textColor: textColor,
        strokeColor: strokeColor
      });
    }
  }

  handleTabChange(tab) {
    const { home, away, colors } = this.props.products;
    if (tab === "home") {
      this.setState({
        activeTab: "home",
        textColor: colors[home.jersey.textColorCode],
        strokeColor: colors[home.jersey.strokeColorCode]
      });
    } else if (tab === "away") {
      this.setState({
        activeTab: "away",
        textColor: colors[away.jersey.textColorCode],
        strokeColor: colors[away.jersey.strokeColorCode]
      });
    }
  }

  renderColors(obj, colors) {
    return Object.values(colors).map(c => {
      return (
        <Dropdown.Item
          key={`${obj}${c}`}
          onClick={e => this.handleColorChange(obj, c)}
        >
          <svg height="20" width="20">
            <circle cx="10" cy="10" r="10" fill={c} />
          </svg>
        </Dropdown.Item>
      );
    });
  }

  renderColorOptions() {
    const { colors } = this.props.products;

    return (
      <React.Fragment>
        <svg height="40" width="110">
          <rect height="30" width="100" fill={this.state.textColor} />
        </svg>
        <Dropdown item scrolling>
          <Dropdown.Menu>{this.renderColors("text", colors)}</Dropdown.Menu>
        </Dropdown>
        <br />
        <svg height="40" width="110">
          <rect height="30" width="100" fill={this.state.strokeColor} />
        </svg>
        <Dropdown item scrolling>
          <Dropdown.Menu>{this.renderColors("stroke", colors)}</Dropdown.Menu>
        </Dropdown>
        <br />
      </React.Fragment>
    );
  }

  render() {
    const { activeTab } = this.state;

    return (
      <div>
        <Menu attached="top" tabular size="mini">
          <Menu.Item
            name="home"
            active={activeTab === "home"}
            onClick={() => this.handleTabChange("home")}
          />
          <Menu.Item
            name="away"
            active={activeTab === "away"}
            onClick={() => this.handleTabChange("away")}
          />
        </Menu>
        <Segment attached="bottom">{this.renderColorOptions()}</Segment>
      </div>
    );
  }
}

export default connect()(ColorOptions);
