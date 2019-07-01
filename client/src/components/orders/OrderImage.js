import '../../css/productImage.css'
import React, { Component } from 'react'
import { Modal, Image } from 'semantic-ui-react'
import _ from 'lodash'

class OrderImage extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })
  render() {
    const frontImage = this.props.src

    const img1 = _.chain(frontImage).replace(/&wid=201$/, '')
    const img4 = _.chain(img1).replace(/_\d/, '_4')
    const img8 = _.chain(img1).replace(/_\d/, '_8')
    const img13 = _.chain(img1).replace(/_\d/, '_13')

    return (
      <Modal
        trigger={
          <Image
            className="productImage"
            src={frontImage}
            onClick={this.handleOpen}
          />
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="large"
        closeIcon
      >
        <Modal.Content image>
          <Image wrapped size="large" src={img1} />
          <Image wrapped size="large" src={img4} />
          <Image wrapped size="large" src={img8} />
          <Image wrapped size="large" src={img13} />
        </Modal.Content>
      </Modal>
    )
  }
}

export default OrderImage
