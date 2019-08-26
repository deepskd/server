import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, List, Icon } from 'semantic-ui-react'
import { getTeams } from '../../actions/actionsTeam'
import TeamItem from '../TeamItem'

const Teams = () => {
  const dispatch = useDispatch()
  const teams = useSelector(state => state.teams)

  useEffect(() => {
    dispatch(getTeams())
  }, [dispatch])

  const renderTeams = () => {
    if (teams.length === 0) {
      return null
    }

    return teams.map(team => {
      return (
        <Fragment key={team._id}>
          <TeamItem team={team} />
          <Link to={`/teams/${team._id}`} as="a">
            Manage
          </Link>
        </Fragment>
      )
    })
  }

  return (
    <Grid columns={1}>
      <Grid.Row>
        <Grid.Column floated="right" width={5}>
          <Link to="/teams/new">
            <Icon name="plus" color="blue" size="large" />
            Add Team
          </Link>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column width={10}>
          <List divided relaxed>
            {renderTeams()}
          </List>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Teams
