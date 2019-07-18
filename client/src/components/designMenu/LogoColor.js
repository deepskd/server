import React, { Component } from 'react'
import _ from 'lodash'
import { Dropdown, Grid, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logoColorChanged } from '../../actions'

class LogoColor extends Component {
  constructor(props) {
    super(props)
    const { home, away, colors } = this.props.products
    const { uniformType } = this.props
    const logoColorCode = {
      home: home[uniformType].logoColorCode,
      away: away[uniformType].logoColorCode,
    }
    this.state = {
      logoColor: {
        home: colors[logoColorCode.home].hex,
        away: colors[logoColorCode.away].hex,
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    const { home, away, colors } = nextProps.products
    const { uniformType } = this.props
    if (
      home[uniformType].frontImage !==
        this.props.products.home[uniformType].frontImage ||
      away[uniformType].frontImage !==
        this.props.products.away[uniformType].frontImage
    ) {
      const logoColorCode = {
        home: home[uniformType].logoColorCode,
        away: away[uniformType].logoColorCode,
      }
      this.setState({
        logoColor: {
          home: colors[logoColorCode.home].hex,
          away: colors[logoColorCode.away].hex,
        },
      })
    }
  }

  handleColorChange(c) {
    const { activeTab } = this.props
    const { uniformType } = this.props

    const update = _.cloneDeep(this.state)
    update.logoColor[activeTab] = c
    this.setState(update)

    console.log(this.getColorCode(c))

    const result = {}
    result.uniformType = uniformType
    result[activeTab] = color
    console.log(result)
    this.props.logoColorChanged(result)
  }

  renderColors() {
    const { colors } = this.props.products
    const { activeTab } = this.props

    return Object.values(colors).map(c => {
      const style = {
        backgroundColor: c.hex,
        borderColor: 'black',
        borderWidth: 'thin',
      }
      return (
        <Dropdown.Item
          key={`${activeTab}${c.hex}`}
          onClick={e => this.handleColorChange(c.hex)}
        >
          <Label style={style} />
          {c.label}
        </Dropdown.Item>
      )
    })
  }

  getColor() {
    const { activeTab } = this.props
    return this.state.logoColor[activeTab]
  }

  getColorCode = color => {
    const { colors } = this.props.products
    return _.findKey(colors, { hex: color })
  }

  render() {
    const logoColorStyle = {
      backgroundColor: this.getColor(),
      borderColor: 'black',
      borderWidth: 'thin',
    }

    const logoColorLabel = (
      <span>
        <Label size="big" style={logoColorStyle} />
      </span>
    )

    return (
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column width={4}>
            <Dropdown trigger={logoColorLabel} item scrolling>
              <Dropdown.Menu>{this.renderColors()}</Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default connect(
  null,
  { logoColorChanged }
)(LogoColor)
