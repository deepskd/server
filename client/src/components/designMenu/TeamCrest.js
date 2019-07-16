import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Image } from 'semantic-ui-react'

import { jerseyTeamCrestChanged } from '../../actions'

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

export default connect(
  null,
  { jerseyTeamCrestChanged }
)(TeamCrest)
