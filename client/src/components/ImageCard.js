import '../css/productImage.css'
import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Image,
  Placeholder,
  Card,
  Ref,
  Reveal,
  Checkbox,
  Header,
  Modal,
  Dropdown,
  Label,
} from 'semantic-ui-react'

import { baseColorChanged } from '../actions'

class ImageCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      checked: false,
      imageURL: this.props.src.frontImage,
      baseColorHex: this.props.src.baseColorHex,
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
        baseColorHex: nextProps.src.baseColorHex,
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

  handleBaseColorChange = baseColor => {
    const props = {}
    props.item = this.props.alt
    props.color = baseColor
    this.props.baseColorChanged(props)
  }

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

  renderColors = () => {
    const { baseOptions } = this.props
    return Object.keys(baseOptions).map(c => {
      const backgroundColor = `${baseOptions[c].hex}`
      const borderColor = baseOptions[c].circle
        ? baseOptions[c].circle
        : '#000000'
      const borderWidth = baseOptions[c].circle ? 'thick' : 'thin'
      const colorStyle = {
        backgroundColor,
        borderColor,
        borderWidth,
      }
      return (
        <Dropdown.Item
          key={`${c}`}
          onClick={() => this.handleBaseColorChange(c)}
        >
          <Label style={colorStyle} />
          {baseOptions[c].label}
        </Dropdown.Item>
      )
    })
  }

  renderBaseColorOptions = () => {
    const { baseColorHex } = this.state

    const trigger = (
      <span>
        <Label
          style={{
            backgroundColor: baseColorHex,
            borderColor: 'black',
            borderWidth: 'thin',
          }}
        />
      </span>
    )
    return (
      <React.Fragment>
        <Dropdown trigger={trigger} scrolling>
          <Dropdown.Menu>{this.renderColors()}</Dropdown.Menu>
        </Dropdown>
      </React.Fragment>
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
            {this.renderBaseColorOptions()}
            <Checkbox
              name="add"
              onChange={this.addToCart}
              checked={this.state.checked}
              className="ui right floated"
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

export default connect(
  null,
  { baseColorChanged }
)(ImageCard)
