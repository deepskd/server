import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Button, Modal, Image } from 'semantic-ui-react'

import { jerseyTeamCrestChanged } from '../../actions'
import { getTeamImages } from '../../actions/actionsImage'

const images = [
  'https://gtsprod-res.cloudinary.com/image/upload/v1/miteam/imagelib/1095641786.png',
  'https://gtsprod-res.cloudinary.com/image/upload/v1/miteam/imagelib/920028688.png',
  'https://gtsprod-res.cloudinary.com/image/upload/v1/miteam/imagelib/309844279.png',
  'https://gtsprod-res.cloudinary.com/image/upload/v1/miteam/imagelib/513596038.png',
]

class TeamCrest extends Component {
  state = { modalOpen: false, crest: { home: '', away: '' } }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  renderCrests() {
    const teamImages = this.props.images
    if (_.isEmpty(teamImages)) {
      return images.map((image, index) => {
        return (
          <Image
            key={index}
            src={image}
            onClick={() => this.handleCrestSelected(image)}
          />
        )
      })
    }

    return teamImages.map(image => {
      return (
        <Image
          key={image._id}
          src={image.previewImageURL}
          onClick={() => this.handleCrestSelected(image.previewImageURL)}
        />
      )
    })
  }

  componentDidMount() {
    const { team } = this.props.teamProducts || null
    if (team) {
      this.props.getTeamImages(team._id)
    }
  }

  handleCrestSelected = image => {
    const { crest } = this.state
    const { activeTab } = this.props

    crest[activeTab] = image
    this.setState({ crest })

    const props = {}
    props.item = activeTab
    props.imageUrl = image
    this.props.jerseyTeamCrestChanged(props)
    this.handleClose()
  }
  render() {
    const { modalOpen, crest } = this.state
    const { activeTab } = this.props
    let trigger = (
      <Button size="small" onClick={this.handleOpen}>
        Add Crest
      </Button>
    )
    if (crest[activeTab]) {
      trigger = (
        <Image size="small" src={crest[activeTab]} onClick={this.handleOpen} />
      )
    }
    return (
      <Modal trigger={trigger} open={modalOpen} onClose={this.handleClose}>
        <Modal.Content>
          <Image.Group size="small">{this.renderCrests()}</Image.Group>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return { images: state.images, teamProducts: state.teamProducts }
}

export default connect(
  mapStateToProps,
  { jerseyTeamCrestChanged, getTeamImages }
)(TeamCrest)
