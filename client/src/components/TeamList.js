import React from 'react'
import { connect } from 'react-redux'
import TeamItem from './TeamItem'
import { Grid, List } from 'semantic-ui-react'

class TeamList extends React.Component {
  renderTeams() {
    if (!this.props.teams) {
      return null
    }
    return this.props.teams.map(team => {
      return <TeamItem key={team._id} team={team} />
    })
  }

  render() {
    return (
      <Grid columns={1} centered>
        <Grid.Column width={10}>
          <List divided relaxed>
            {this.renderTeams()}
          </List>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    teams: state.teams,
  }
}

export default connect(mapStateToProps)(TeamList)
