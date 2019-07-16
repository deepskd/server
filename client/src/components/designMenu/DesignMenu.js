import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'

import JerseyTextColors from './JerseyTextColors'
import JerseyText from './JerseyText'

class DesignMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'home',
    }
  }

  render() {
    const { activeTab } = this.state
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

        <Segment attached="bottom">
          <JerseyText products={products} activeTab={activeTab} />
          <JerseyTextColors products={products} activeTab={activeTab} />
        </Segment>
      </React.Fragment>
    )
  }
}

export default DesignMenu
