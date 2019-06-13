import React from 'react'
import ReactGA from 'react-ga'
import { connect } from 'react-redux'

import { Grid, Form } from 'semantic-ui-react'

import { findTeams } from '../actions'

class SearchBar extends React.Component {
  state = { term: '' }

  onInputChange = event => {
    this.setState({ term: event.target.value })
  }

  onFormSubmit = event => {
    event.preventDefault()
    ReactGA.event({
      category: 'FindSchool',
      action: this.state.term,
    })

    this.props.findTeams(this.state.term)
  }

  render() {
    return (
      <Grid centered>
        <Grid.Column largeScreen={12} mobile={14}>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Input
              action={{
                icon: 'search',
                color: 'blue',
                onClick: this.onFormSubmit,
              }}
              value={this.state.term}
              onChange={this.onInputChange}
              placeholder={'School Name'}
            />
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(
  null,
  { findTeams }
)(SearchBar)
