import React from 'react'
import { Menu, Segment, Accordion, Icon } from 'semantic-ui-react'

import JerseyTextColors from './JerseyTextColors'
import JerseyText from './JerseyText'

class DesignMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'home',
      activeIndex: 0,
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeTab, activeIndex } = this.state
    const { products } = this.props

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
          <Accordion styled>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              Jersey Text
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <JerseyText products={products} activeTab={activeTab} />
              <JerseyTextColors products={products} activeTab={activeTab} />
            </Accordion.Content>
          </Accordion>
        </Segment>
      </React.Fragment>
    )
  }
}

export default DesignMenu
