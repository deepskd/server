import React, { Component } from 'react'
import { Grid, Button, Header } from 'semantic-ui-react'
import _ from 'lodash'

import { connect } from 'react-redux'
import { jerseyTextSizeChanged } from '../../actions'

class JerseyTextSize extends Component {
  handleClick = (e, { name }) => {
    const props = {}
    props.uniformType = 'jersey'
    props.colorType = this.props.activeTab
    props.textSize = name
    this.props.jerseyTextSizeChanged(props)
  }
  renderSizeOptions() {
    const { upper_front } = this.props.products.decorations.jersey.text
    return upper_front.options.size.map((option, index) => {
      return (
        <React.Fragment key={index}>
          <Button name={option} onClick={this.handleClick}>
            {_.capitalize(option)}
          </Button>
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
      <Grid colums={2}>
        <Grid.Column width={4} verticalAlign="middle">
          <Header sub>Size</Header>
        </Grid.Column>
        <Grid.Column width={12}>
          <Button.Group compact size="mini">
            {this.renderSizeOptions()}
          </Button.Group>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(
  null,
  { jerseyTextSizeChanged }
)(JerseyTextSize)
