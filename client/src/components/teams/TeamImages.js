import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeamImages } from '../../actions/actionsImage'
import { Card, Image } from 'semantic-ui-react'
import _ from 'lodash'

const TeamImages = ({ teamId }) => {
  const dispatch = useDispatch()
  const images = useSelector(({ images }) => images)

  useEffect(() => {
    dispatch(getTeamImages(teamId))
  }, [teamId, dispatch])

  const renderImages = () => {
    if (_.isEmpty(images)) {
      return <Fragment />
    }
    return images.map(({ _id, previewImageURL }) => (
      <Image key={_id} src={previewImageURL} />
    ))
  }

  return <Image.Group size="small">{renderImages()}</Image.Group>
}

export default TeamImages
