import React, { Component } from 'react'
import { Input, Grid } from 'semantic-ui-react'

class JerseyNumber extends Component {
  constructor(props) {
    super(props)
    const { home, away } = this.props.products
    this.state = {
      number: {
        home: home.jersey.playerNumber,
        away: away.jersey.playerNumber,
      },
    }
  }
  componentWillReceiveProps(nextProps) {
    const { home, away } = nextProps.products
    if (
      home.jersey.playerNumber !==
        this.props.products.home.jersey.playerNumber ||
      away.jersey.playerNumber !== this.props.products.away.jersey.playerNumber
    ) {
      this.setState({
        number: {
          home: home.jersey.playerNumber,
          away: away.jersey.playerNumber,
        },
      })
    }
  }
  render() {
    const number = this.state.number[this.props.activeTab]
    return (
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={5}>
            <Input size="mini" value={number}>
              <input style={{ textAlign: 'center' }} />
            </Input>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default JerseyNumber
