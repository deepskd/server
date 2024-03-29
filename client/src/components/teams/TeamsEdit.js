import React, { Fragment, useEffect } from 'react'
import { Segment, Label, Button } from 'semantic-ui-react'
import { getTeam } from '../../actions/actionsTeam'
import { uploadTeamImages } from '../../actions/actionsImage'
import { useDispatch, useSelector } from 'react-redux'

import TeamImages from './TeamImages'

const TeamEdit = ({ match }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTeam(match.params.id))
  }, [match.params.id, dispatch])

  const teams = useSelector(({ teams }) => teams)

  const onUpload = e => {
    const files = Array.from(e.target.files)

    const formData = new FormData()

    let team = teams[0]
    formData.append('teamId', team._id)

    files.forEach((file, i) => {
      formData.append(i, file)
    })

    dispatch(uploadTeamImages(formData))
  }

  const renderTeamDetails = () => {
    if (teams.length !== 1) {
      return <Fragment />
    }

    let team = teams[0]
    return (
      <Fragment>
        {team.name}, {team.mascot}
        <Segment>
          <Label as="label" basic htmlFor="upload">
            <Button
              icon="images"
              label={{
                basic: true,
                content: 'Select file(s)',
              }}
              labelPosition="right"
            />
            <input
              hidden
              id="upload"
              multiple
              type="file"
              onChange={onUpload}
            />
          </Label>
        </Segment>
        <TeamImages teamId={team._id} />
      </Fragment>
    )
  }
  return <Segment>{renderTeamDetails()}</Segment>
}

export default TeamEdit
