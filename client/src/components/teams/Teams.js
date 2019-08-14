import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import { getTeams } from '../../actions/actionsTeam'

const Teams = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTeams())
  }, [])
  return (
    <Grid>
      <Grid.Row>Teams Page</Grid.Row>
    </Grid>
  )
}

export default Teams
