import React, { Component, Fragment } from 'react'
import { Menu, Segment, Accordion } from 'semantic-ui-react'

import JerseyTextColors from './JerseyTextColors'
import JerseyText from './JerseyText'
import TeamCrest from './TeamCrest'
import JerseyTextSize from './JerseyTextSize'
import JerseyTextStyle from './JerseyTextStyle'
import JerseySleeve from './JerseySleeve'
import PantSides from './PantSides'
import JerseyNumber from './JerseyNumber'
import JerseyGraphics from './JerseyGraphics'
import ColorOptions from './ColorOptions'

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
          <Fragment>
            <JerseyText products={products} activeTab={activeTab} />
            <JerseyTextColors products={products} activeTab={activeTab} />
            <JerseyTextSize
              products={products}
              activeTab={activeTab}
              type="text"
              loc="upper_front"
            />
            <JerseyTextStyle products={products} activeTab={activeTab} />
          </Fragment>
        )
      case 'jersey-number':
        return (
          <Fragment>
            <JerseyNumber products={products} activeTab={activeTab} />
            <JerseyTextSize
              products={products}
              activeTab={activeTab}
              type="number"
              loc="front"
            />
            <JerseyTextSize
              products={products}
              activeTab={activeTab}
              type="number"
              loc="back"
            />
          </Fragment>
        )
      case 'jersey-team-crest':
        return <TeamCrest products={products} activeTab={activeTab} />
      case 'jersey-logo':
        return (
          <ColorOptions
            products={products}
            activeTab={activeTab}
            uniformType="jersey"
            attributeType="logoColorCode"
          />
        )
      case 'jersey-collar':
        return (
          <ColorOptions
            products={products}
            activeTab={activeTab}
            uniformType="jersey"
            attributeType="collarColorCode"
          />
        )
      case 'jersey-sleeve-insert':
        return (
          <ColorOptions
            products={products}
            activeTab={activeTab}
            uniformType="jersey"
            attributeType="sleeveInsertColorCode"
          />
        )
      case 'jersey-neck':
        return (
          <ColorOptions
            products={products}
            activeTab={activeTab}
            uniformType="jersey"
            attributeType="neckColorCode"
          />
        )
      case 'jersey-side-stripe-1':
        return (
          <ColorOptions
            products={products}
            activeTab={activeTab}
            uniformType="jersey"
            attributeType="stripe1ColorCode"
          />
        )
      case 'jersey-side-stripe-2':
        return (
          <ColorOptions
            products={products}
            activeTab={activeTab}
            uniformType="jersey"
            attributeType="stripe2ColorCode"
          />
        )
      case 'pant-logo':
        return (
          <ColorOptions
            products={products}
            activeTab={activeTab}
            uniformType="pant"
            attributeType="logoColorCode"
          />
        )
      case 'jersey-sleeve':
        return <JerseySleeve products={products} activeTab={activeTab} />
      case 'pant-sides':
        return <PantSides products={products} activeTab={activeTab} />
      case 'jersey-graphics':
        return <JerseyGraphics products={products} activeTab={activeTab} />
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
