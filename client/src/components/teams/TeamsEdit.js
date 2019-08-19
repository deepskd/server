import React, { useEffect } from 'react'
import { Segment } from 'semantic-ui-react'
import { getTeams } from '../../actions/actionsTeam'
import { useDispatch } from 'react-redux'

const TeamEdit = ({ match }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTeams(match.params.id))
  }, [match, dispatch])
  return <Segment>Team Edit Page</Segment>
}

export default TeamEdit
