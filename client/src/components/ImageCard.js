import React from "react";
import _ from "lodash";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: "",
      direction: "front",
      imageURL: this.props.src.frontImage,
      text: this.props.src.jerseyText
    };

    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.hideLoader);
  }

  componentDidUpdate() {
    this.imageRef.current.addEventListener("load", this.hideLoader);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src.frontImage !== this.state.imageURL) {
      this.setState({
        imageURL: nextProps.src.frontImage,
        direction: "front",
        loading: ""
      });
    }
  }

  hideLoader = () => {
    // console.log(this.state);
    this.setState({ loading: "active" });
    // console.log(this.state);
  };

  rotateImage = article => {
    let imageURL = article;
    if (this.state.direction === "back") {
      imageURL = _.replace(article, /_(1|7)/, "_1");
      this.setState({ direction: "front", imageURL: imageURL, loading: "" });
    } else if (this.state.direction === "front") {
      imageURL = _.replace(article, "_1", "_7");
      this.setState({ direction: "back", imageURL: imageURL, loading: "" });
    }
  };

  render() {
    const { src } = this.props;
    if (!src) {
      return <div>Loading</div>;
    }

    return (
      <div className="card fluid" style={{ width: "250px" }}>
        <div
          className={`ui ${this.state.loading} slide masked reveal image`}
          style={{ height: "300px" }}
        >
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
        <div className="extra content">
          <div className="ui sub header">{src.articleDescription}</div>
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
