import React from 'react'
import { Grid, Header } from 'semantic-ui-react'

import _ from 'lodash'
const SchoolCard = props => {
  const { name, city, state, mascot, colors } = props.team

  return (
    <Grid.Row columns={4}>
      <Grid.Column>
        <Header as="h5" block>
          Name: {name}
        </Header>
      </Grid.Column>
      <Grid.Column>
        <Header as="h5" block>
          {city},{state}
        </Header>
      </Grid.Column>
      <Grid.Column>
        <Header as="h5" block>
          Mascot: {mascot}
        </Header>{' '}
      </Grid.Column>
      <Grid.Column>
        <Header as="h5" block>
          Colors:{renderColors(colors)}
        </Header>
      </Grid.Column>
    </Grid.Row>
  )
}

const renderColors = colors =>
  _.split(colors, ',')
    .map(color => _.capitalize(color))
    .join(',')

export default SchoolCard
