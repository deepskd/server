import React from "react";
import _ from "lodash";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      direction: "front",
      imageURL: this.props.src.frontImage
    };

    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.hideLoader);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({
        imageURL: nextProps.src.frontImage,
        direction: "front",
        loading: true
      });
    }
  }

  hideLoader = () => {
    this.setState({ loading: false });
  };

  renderLoader() {
    if (!this.state.loading) {
      return "ui active masked slide reveal image";
    }
    return "ui slide masked reveal image";
  }

  rotateImage = article => {
    let imageURL = article;
    if (this.state.direction === "back") {
      imageURL = _.replace(article, /_(1|7)/, "_1");
      this.setState({ direction: "front", imageURL: imageURL, loading: true });
    } else if (this.state.direction === "front") {
      imageURL = _.replace(article, "_1", "_7");
      this.setState({ direction: "back", imageURL: imageURL, loading: true });
    }
  };

  render() {
    const { src } = this.props;
    if (!src) {
      return <div>Loading</div>;
    }

    return (
      <div className="card fluid" style={{ width: "250px" }}>
        <div className={this.renderLoader()} style={{ height: "300px" }}>
          <div className="ui fluid placeholder visible content">
            <div className="image" style={{ height: "300px" }} />
          </div>
          <div className="image hidden content" style={{ height: "300px" }}>
            <div className="ui right floated mini icon button">
              <i
                className="redo icon"
                onClick={() => this.rotateImage(this.state.imageURL)}
              />
            </div>
            <img
              ref={this.imageRef}
              src={this.state.imageURL}
              alt={this.props.alt}
            />
          </div>
        </div>
        <div className="content">
          <div className="ui sub header">{src.articleDescription}</div>
        </div>
        <div className="extra content">
          <span className="left floated">{src.price}</span>
          <span className="right floated">
            <i className="cart icon" />
          </span>
        </div>
      </div>
    );
  }
}

export default ImageCard;
