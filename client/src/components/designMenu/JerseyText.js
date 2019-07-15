import React from 'react'
import { connect } from 'react-redux'
import { Menu, Segment, Form } from 'semantic-ui-react'
import { jerseyTextChanged } from '../../actions'

import JerseyTextColors from './JerseyTextColors'

class JerseyText extends React.Component {
  constructor(props) {
    super(props)
    const { home, away } = this.props.products
    this.state = {
      activeTab: 'home',
      jerseyText: {
        home: home.jersey.frontText,
        away: away.jersey.frontText,
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    const { home, away } = nextProps.products
    if (
      home.jersey.frontImage !== this.props.products.home.jersey.frontImage ||
      away.jersey.frontImage !== this.props.products.away.jersey.frontImage
    ) {
      this.setState({
        jerseyText: {
          home: home.jersey.frontText,
          away: away.jersey.frontText,
        },
      })
    }
  }

  handleInputChange = event => {
    const { activeTab, jerseyText } = this.state
    const text = Object.assign({}, jerseyText)
    text[activeTab] = event.target.value.toUpperCase()
    this.setState({ jerseyText: text })
  }

  handleTextUpdate = () => {
    const { activeTab, jerseyText } = this.state
    const updateText = {}
    updateText[activeTab] = jerseyText[activeTab]
    this.props.jerseyTextChanged(updateText)
  }

  render() {
    const { activeTab, jerseyText } = this.state

    return (
      <div>
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
          <Form.Input
            action={{ icon: 'edit', onClick: this.handleTextUpdate }}
            fluid
            label="Team Name"
            value={jerseyText[activeTab]}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                this.handleTextUpdate()
              }
            }}
            onChange={e => this.handleInputChange(e)}
          />
          <JerseyTextColors
            products={this.props.products}
            activeTab={activeTab}
          />
        </Segment>
      </div>
    )
  }
}

export default connect(
  null,
  { jerseyTextChanged }
)(JerseyText)
