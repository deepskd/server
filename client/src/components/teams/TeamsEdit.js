import React, { Fragment, useEffect } from 'react'
import { Segment } from 'semantic-ui-react'
import { getTeam } from '../../actions/actionsTeam'
import { useDispatch, useSelector } from 'react-redux'

const TeamEdit = ({ match }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTeam(match.params.id))
  }, [match.params.id, dispatch])

  const teams = useSelector(state => state.teams)
  console.log(teams)

  const renderTeamDetails = () => {
    if (teams.length !== 1) {
      return <Fragment />
    }

    let team = teams[0]
    return (
      <Segment>
        {team.name}, {team.mascot}
      </Segment>
    )
  }
  return <Segment>{renderTeamDetails()}</Segment>
}

export default TeamEdit
