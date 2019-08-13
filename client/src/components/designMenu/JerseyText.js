import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import { jerseyTextChanged } from '../../actions'

class JerseyText extends React.Component {
  constructor(props) {
    super(props)
    const { home, away } = this.props.products
    this.state = {
      jerseyText: {
        home: home.jersey.frontText,
        away: away.jersey.frontText,
      },
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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
    const { jerseyText } = this.state
    const { activeTab } = this.props
    const text = Object.assign({}, jerseyText)
    text[activeTab] = event.target.value.toUpperCase()
    this.setState({ jerseyText: text })
  }

  handleTextUpdate = () => {
    const { activeTab } = this.props
    const props = {}
    props.uniformType = 'jersey'
    props.colorType = activeTab
    props.frontText = this.state.jerseyText[activeTab]
    this.props.jerseyTextChanged(props)
  }

  render() {
    const { jerseyText } = this.state
    const { activeTab } = this.props

    return (
      <React.Fragment>
        <Form.Input
          action={{ icon: 'edit', onClick: this.handleTextUpdate }}
          fluid
          value={jerseyText[activeTab]}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              this.handleTextUpdate()
            }
          }}
          onChange={e => this.handleInputChange(e)}
        />
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  { jerseyTextChanged }
)(JerseyText)
