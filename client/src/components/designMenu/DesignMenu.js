import React from 'react'
import { Menu, Segment, Accordion, Icon } from 'semantic-ui-react'

import JerseyTextColors from './JerseyTextColors'
import JerseyText from './JerseyText'
import TeamCrest from './TeamCrest'

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
          <Accordion>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              Jersey Front Text
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <JerseyText products={products} activeTab={activeTab} />
              <JerseyTextColors products={products} activeTab={activeTab} />
            </Accordion.Content>
            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              Jersey Team Crest
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <TeamCrest products={products} activeTab={activeTab} />
            </Accordion.Content>
          </Accordion>
        </Segment>
      </React.Fragment>
    )
  }
}

export default DesignMenu
