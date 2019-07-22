import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import _ from 'lodash'

class JerseyTextSize extends Component {
  renderSizeOptions() {
    const { upper_front } = this.props.products.decorations.jersey.text
    return upper_front.options.size.map((option, index) => {
      return (
        <React.Fragment key={index}>
          <Button name={option}>{_.capitalize(option)}</Button>
          {index === upper_front.options.size.length - 1 ? '' : <Button.Or />}
        </React.Fragment>
      )
    })
  }
  render() {
    const { text } = this.props.products.decorations.jersey
    if (!text || !text.hasOwnProperty('upper_front')) {
      return <div></div>
    }

    if (text.upper_front.options.size.length === 1) {
      return <div></div>
    }

    return (
      <React.Fragment>
        Text Size <br />
        <Button.Group compact size="tiny">
          {this.renderSizeOptions()}
        </Button.Group>
      </React.Fragment>
    )
  }
}

export default JerseyTextSize