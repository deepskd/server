import React, { Component } from 'react'
import _ from 'lodash'
import { Menu, Segment, Dropdown, Grid, Button, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { jerseyTextColorChnaged } from '../../actions'

class ColorOptions extends Component {
  constructor(props) {
    super(props)
    const { home, away, colors } = this.props.products
    this.state = {
      activeTab: 'home',
      hometextColor: colors[home.jersey.textColorCode].hex,
      homestrokeColor: colors[home.jersey.strokeColorCode].hex,
      awaytextColor: colors[away.jersey.textColorCode].hex,
      awaystrokeColor: colors[away.jersey.strokeColorCode].hex,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { home, away, colors } = nextProps.products
    if (
      home.jersey.frontImage !== this.props.products.home.jersey.frontImage ||
      away.jersey.frontImage !== this.props.products.away.jersey.frontImage
    ) {
      this.setState({
        hometextColor: colors[home.jersey.textColorCode].hex,
        homestrokeColor: colors[home.jersey.strokeColorCode].hex,
        awaytextColor: colors[away.jersey.textColorCode].hex,
        awaystrokeColor: colors[away.jersey.strokeColorCode].hex,
      })
    }
  }

  handleColorChange(obj, c) {
    const { activeTab } = this.state
    if (activeTab === 'home') {
      const textColor = obj === 'text' ? c : this.state.hometextColor
      const strokeColor = obj === 'stroke' ? c : this.state.homestrokeColor
      this.setState({
        activeTab: 'home',
        hometextColor: textColor,
        homestrokeColor: strokeColor,
      })
    } else if (activeTab === 'away') {
      const textColor = obj === 'text' ? c : this.state.awaytextColor
      const strokeColor = obj === 'stroke' ? c : this.state.awaystrokeColor
      this.setState({
        activeTab: 'away',
        awaytextColor: textColor,
        awaystrokeColor: strokeColor,
      })
    }
  }

  handleTabChange = (e, { name }) => this.setState({ activeTab: name })

  renderColors(obj, colors) {
    return Object.values(colors).map(c => {
      const style = {
        backgroundColor: c.hex,
        borderColor: 'black',
        borderWidth: 'thin',
      }
      return (
        <Dropdown.Item
          key={`${obj}${c.hex}`}
          onClick={e => this.handleColorChange(obj, c.hex)}
        >
          <Label style={style} />
          {c.label}
        </Dropdown.Item>
      )
    })
  }

  getColor(option) {
    if (option === 'text') {
      return this.state.activeTab === 'home'
        ? this.state.hometextColor
        : this.state.awaytextColor
    } else if (option === 'stroke') {
      return this.state.activeTab === 'home'
        ? this.state.homestrokeColor
        : this.state.awaystrokeColor
    }
  }

  getColorCode = color => {
    const { colors } = this.props.products
    console.log(color)
    return _.findKey(colors, { hex: color })
  }

  handleColorUpdate = () => {
    const {
      activeTab,
      hometextColor,
      awaytextColor,
      homestrokeColor,
      awaystrokeColor,
    } = this.state

    const color = {}
    if (activeTab === 'home') {
      color['text'] = this.getColorCode(hometextColor)
      color['stroke'] = this.getColorCode(homestrokeColor)
    } else {
      color['text'] = this.getColorCode(awaytextColor)
      color['stroke'] = this.getColorCode(awaystrokeColor)
    }
    const result = {}
    result[activeTab] = color
    this.props.jerseyTextColorChnaged(result)
  }

  renderColorOptions() {
    const { colors } = this.props.products

    const textColorStyle = {
      backgroundColor: this.getColor('text'),
      borderColor: 'black',
      borderWidth: 'thin',
    }
    const strokeColorStyle = {
      backgroundColor: this.getColor('stroke'),
      borderColor: 'black',
      borderWidth: 'thin',
    }
    const textColorLabel = (
      <span>
        <Label size="big" style={textColorStyle} />
      </span>
    )
    const strokeColorLabel = (
      <span>
        <Label size="big" style={strokeColorStyle} />
      </span>
    )
    return (
      <React.Fragment>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column width={4}>
              <Dropdown trigger={textColorLabel} item scrolling>
                <Dropdown.Menu>
                  {this.renderColors('text', colors)}
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
            <Grid.Column width={4}>
              <Dropdown trigger={strokeColorLabel} item scrolling>
                <Dropdown.Menu>
                  {this.renderColors('stroke', colors)}
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
            <Grid.Column width={6}>
              <Button size="mini" color="blue" onClick={this.handleColorUpdate}>
                Update
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }

  render() {
    const { activeTab } = this.state

    return (
      <div>
        <Menu attached="top" tabular size="mini">
          <Menu.Item
            name="home"
            active={activeTab === 'home'}
            onClick={this.handleTabChange}
          />
          <Menu.Item
            name="away"
            active={activeTab === 'away'}
            onClick={this.handleTabChange}
          />
        </Menu>
        <Segment attached="bottom">{this.renderColorOptions()}</Segment>
      </div>
    )
  }
}

export default connect(
  null,
  { jerseyTextColorChnaged }
)(ColorOptions)
