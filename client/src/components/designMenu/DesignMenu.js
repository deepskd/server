import React, { Component } from 'react'
import { Menu, Segment, Accordion } from 'semantic-ui-react'

import JerseyTextColors from './JerseyTextColors'
import JerseyText from './JerseyText'
import TeamCrest from './TeamCrest'
import LogoColor from './LogoColor'
import JerseyTextSize from './JerseyTextSize'
import JerseyTextStyle from './JerseyTextStyle'
import JerseySleeve from './JerseySleeve'
import PantSides from './PantSides'

class DesignMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'home',
    }
  }

  buildPanel = key => {
    const { activeTab } = this.state
    const { products } = this.props
    switch (key) {
      case 'jersey-front-text':
        return (
          <React.Fragment>
            <JerseyText products={products} activeTab={activeTab} />
            <JerseyTextColors products={products} activeTab={activeTab} />
            <JerseyTextSize products={products} activeTab={activeTab} />
            <JerseyTextStyle products={products} activeTab={activeTab} />
          </React.Fragment>
        )
      case 'jersey-team-crest':
        return <TeamCrest products={products} activeTab={activeTab} />
      case 'jersey-logo':
        return (
          <LogoColor
            products={products}
            activeTab={activeTab}
            uniformType="jersey"
          />
        )
      case 'pant-logo':
        return (
          <LogoColor
            products={products}
            activeTab={activeTab}
            uniformType="pant"
          />
        )
      case 'jersey-sleeve':
        return <JerseySleeve products={products} activeTab={activeTab} />
      case 'pant-sides':
        return <PantSides products={products} activeTab={activeTab} />
      default:
        return ''
    }
  }

  renderPanels = () => {
    const { panels } = this.props.products

    return panels.map(({ key, title }) => {
      return {
        key,
        title,
        content: { content: this.buildPanel(key) },
      }
    })
  }

  render() {
    const { activeTab } = this.state

    return (
      <React.Fragment>
        <Menu attached="top" tabular size="mini">
          <Menu.Item
            name="home"
            active={activeTab === 'home'}
            onClick={() => this.setState({ activeTab: 'home' })}
          />
          <Menu.Item
            name="away"
            active={activeTab === 'away'}
            onClick={() => this.setState({ activeTab: 'away' })}
          />
        </Menu>

        <Segment basic attached="bottom">
          <Accordion defaultActiveIndex={0} panels={this.renderPanels()} />
        </Segment>
      </React.Fragment>
    )
  }
}

export default DesignMenu
