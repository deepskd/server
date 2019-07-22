import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import _ from 'lodash'

class JerseyTextStyle extends Component {
  renderStyleOptions() {
    const { upper_front } = this.props.products.decorations.jersey.text
    return upper_front.options.style.map((option, index) => {
      return (
        <React.Fragment key={index}>
          <Button name={option}>{_.capitalize(option)}</Button>
          {index === upper_front.options.style.length - 1 ? '' : <Button.Or />}
        </React.Fragment>
      )
    })
  }
  render() {
    const { text } = this.props.products.decorations.jersey
    if (!text || !text.hasOwnProperty('upper_front')) {
      return <div></div>
    }

    if (text.upper_front.options.style.length === 1) {
      return <div></div>
    }

    return (
      <React.Fragment>
        <br></br>Text Style <br />
        <Button.Group compact size="tiny">
          {this.renderStyleOptions()}
        </Button.Group>
      </React.Fragment>
    )
  }
}

export default JerseyTextStyle
