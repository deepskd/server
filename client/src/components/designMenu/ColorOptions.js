import React from "react";
import { Menu, Segment, Dropdown, Grid, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { jerseyTextColorChnaged } from "../../actions";

class ColorOptions extends React.Component {
  constructor(props) {
    super(props);
    const { home, away, colors } = this.props.products;
    this.state = {
      activeTab: "home",
      hometextColor: colors[home.jersey.textColorCode],
      homestrokeColor: colors[home.jersey.strokeColorCode],
      awaytextColor: colors[away.jersey.textColorCode],
      awaystrokeColor: colors[away.jersey.strokeColorCode]
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.mascot !== this.props.mascot ||
      nextProps.teamName !== this.props.teamName
    ) {
      const { home, away, colors } = nextProps.products;
      this.setState({
        hometextColor: colors[home.jersey.textColorCode],
        homestrokeColor: colors[home.jersey.strokeColorCode],
        awaytextColor: colors[away.jersey.textColorCode],
        awaystrokeColor: colors[away.jersey.strokeColorCode]
      });
    }
  }

  handleColorChange(obj, c) {
    const { activeTab } = this.state;
    if (activeTab === "home") {
      const textColor = obj === "text" ? c : this.state.hometextColor;
      const strokeColor = obj === "stroke" ? c : this.state.homestrokeColor;
      this.setState({
        activeTab: "home",
        hometextColor: textColor,
        homestrokeColor: strokeColor
      });
    } else if (activeTab === "away") {
      const textColor = obj === "text" ? c : this.state.awaytextColor;
      const strokeColor = obj === "stroke" ? c : this.state.awaystrokeColor;
      this.setState({
        activeTab: "away",
        awaytextColor: textColor,
        awaystrokeColor: strokeColor
      });
    }
  }

  handleTabChange(tab) {
    if (tab === "home") {
      this.setState({
        activeTab: "home"
      });
    } else if (tab === "away") {
      this.setState({
        activeTab: "away"
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
            <circle
              cx="10"
              cy="10"
              r="10"
              fill={c}
              style={{ stroke: "black" }}
            />
          </svg>
        </Dropdown.Item>
      );
    });
  }

  getColor(option) {
    if (option === "text") {
      return this.state.activeTab === "home"
        ? this.state.hometextColor
        : this.state.awaytextColor;
    } else if (option === "stroke") {
      return this.state.activeTab === "home"
        ? this.state.homestrokeColor
        : this.state.awaystrokeColor;
    }
  }

  getColorCode = color => {
    const { colors } = this.props.products;

    return Object.entries(colors).filter(colorMap => {
      return colorMap[1].includes(color);
    })[0];
  };

  handleColorUpdate = () => {
    const {
      activeTab,
      hometextColor,
      awaytextColor,
      homestrokeColor,
      awaystrokeColor
    } = this.state;

    const color = {};
    if (activeTab === "home") {
      color["text"] = this.getColorCode(hometextColor);
      color["stroke"] = this.getColorCode(homestrokeColor);
    } else {
      color["text"] = this.getColorCode(awaytextColor);
      color["stroke"] = this.getColorCode(awaystrokeColor);
    }
    const result = {};
    result[activeTab] = color;
    this.props.jerseyTextColorChnaged(result);
  };

  renderColorOptions() {
    const { colors } = this.props.products;

    return (
      <React.Fragment>
        <Grid>
          <Grid.Row>
            <Grid.Column floated="left" width={6}>
              <svg height="30px" width="40px">
                <rect
                  height="100%"
                  width="100%"
                  fill={this.getColor("text")}
                  style={{ stroke: "black" }}
                />
              </svg>
              <Dropdown item scrolling>
                <Dropdown.Menu>
                  {this.renderColors("text", colors)}
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <svg height="30px" width="40px">
                <rect
                  height="100%"
                  width="100%"
                  fill={this.getColor("stroke")}
                  style={{ stroke: "black" }}
                />
              </svg>
              <Dropdown item scrolling>
                <Dropdown.Menu>
                  {this.renderColors("stroke", colors)}
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Button size="mini" color="blue" onClick={this.handleColorUpdate}>
              Update
            </Button>
          </Grid.Row>
        </Grid>
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

export default connect(
  null,
  { jerseyTextColorChnaged }
)(ColorOptions);
