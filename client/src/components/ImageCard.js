import React from "react";
import _ from "lodash";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      direction: "front",
      imageURL: this.props.src
    };

    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.hideLoader);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({
        imageURL: nextProps.src,
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
      return <div />;
    }
    return (
      <div className="ui placeholder">
        <div className="square image" />
      </div>
    );
  }

  rotateImage = article => {
    let imageURL = article;
    if (this.state.direction === "back") {
      imageURL = _.replace(article, /_(1|7)/, "_1");
      this.setState({ direction: "front", imageURL: imageURL });
    } else if (this.state.direction === "front") {
      imageURL = _.replace(article, "_1", "_7");
      this.setState({ direction: "back", imageURL: imageURL });
    }
  };

  render() {
    return (
      <div className="card fluid" style={{ width: "250px" }}>
        <div className="image">
          {this.renderLoader()}
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
        <div className="content" />
      </div>
    );
  }
}

export default ImageCard;
