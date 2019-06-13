import React from 'react'
import { connect } from 'react-redux'
import { Menu, Segment, Form } from 'semantic-ui-react'
import { jerseyTextChanged } from '../../actions'

class JerseyText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'home',
      jerseyText: {
        home: this.props.mascot,
        away: this.props.teamName,
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.mascot !== this.props.mascot ||
      nextProps.teamName !== this.props.teamName
    ) {
      this.setState({
        jerseyText: { home: nextProps.mascot, away: nextProps.teamName },
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
        </Segment>
      </div>
    )
  }
}

export default connect(
  null,
  { jerseyTextChanged }
)(JerseyText)
