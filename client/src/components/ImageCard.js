import '../css/productImage.css'
import React, { Component } from 'react'
import {
  Image,
  Placeholder,
  Card,
  Ref,
  Reveal,
  Checkbox,
  Header,
  Modal,
} from 'semantic-ui-react'
import _ from 'lodash'

class ImageCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      checked: false,
      imageURL: this.props.src.frontImage,
      text: this.props.src.jerseyText,
      modalOpen: false,
    }

    this.imageRef = React.createRef()
  }

  componentDidMount() {
    this.imageRef.current.addEventListener('load', this.hideLoader)
  }

  componentDidUpdate() {
    this.imageRef.current.addEventListener('load', this.hideLoader)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src.frontImage !== this.state.imageURL) {
      this.setState({
        imageURL: nextProps.src.frontImage,
        loaded: false,
      })
    }
  }

  hideLoader = () => {
    this.setState({ loaded: true })
  }

  addToCart = () => {
    const { checked } = this.state
    this.setState({ checked: !checked })
    this.props.onSelect(!checked)
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  renderImageViews = imageURL => {
    const img1 = _.chain(imageURL).replace(/&wid=201$/, '')
    const img4 = _.chain(img1).replace(/_\d/, '_4')
    const img8 = _.chain(img1).replace(/_\d/, '_8')
    const img13 = _.chain(img1).replace(/_\d/, '_13')

    return (
      <Modal
        trigger={
          <Ref innerRef={this.imageRef}>
            <Image
              className="productImage"
              src={imageURL}
              onClick={this.handleOpen}
            />
          </Ref>
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

  render() {
    const { src } = this.props
    if (!src) {
      return `Loading`
    }

    const { loaded, imageURL, checked } = this.state

    return (
      <Card
        fluid
        style={{ width: '250px' }}
        color={checked ? 'green' : 'black'}
      >
        <Reveal
          active={loaded}
          className={`slide masked image`}
          style={{ height: '300px' }}
        >
          <Reveal.Content visible>
            <Placeholder fluid>
              <Placeholder.Image style={{ height: '300px' }} />
            </Placeholder>
          </Reveal.Content>
          <Reveal.Content hidden style={{ height: '300px' }}>
            <Checkbox
              name="add"
              onChange={this.addToCart}
              checked={this.state.checked}
            />
            {this.renderImageViews(imageURL)}
          </Reveal.Content>
        </Reveal>
        <Card.Content extra>
          <Header sub>
            {src.articleDescription}
            <span className="right floated">{src.price}</span>
          </Header>
        </Card.Content>
      </Card>
    )
  }
}

export default ImageCard
