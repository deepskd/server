import React, { Component } from 'react'
import {
  Image,
  Placeholder,
  Card,
  Ref,
  Reveal,
  Checkbox,
  Header,
} from 'semantic-ui-react'

class ImageCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      checked: false,
      imageURL: this.props.src.frontImage,
      text: this.props.src.jerseyText,
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

  render() {
    const { src } = this.props
    if (!src) {
      return <div>loaded</div>
    }

    const { loaded, imageURL } = this.state

    return (
      <Card fluid style={{ width: '250px' }}>
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
            <Ref innerRef={this.imageRef}>
              <Image src={imageURL} />
            </Ref>
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
