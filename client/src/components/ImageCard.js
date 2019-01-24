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

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.src !== this.props.src) {
  //     //Perform some operation here
  //     this.setState({ imageURL: "" });
  //   }
  // }

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
    let loader = "ui active inverted dimmer";
    if (!this.state.loading) {
      return <div />;
    }
    return (
      <div className="ui segment">
        <p />
        <div className={loader}>
          <div className="ui loader" />
        </div>
      </div>
    );
  }

  imageRotated = (article, direction) => {
    let imageURL = article;
    if (direction === "front") {
      imageURL = _.replace(article, /_(1|7)/, "_1");
    } else if (direction === "back") {
      imageURL = _.replace(article, "_1", "_7");
    }

    this.setState({ direction: direction, imageURL: imageURL });
  };

  imageRotateOptions = (article, direction) => {
    let buttonState = {};
    buttonState.front = "ui button";
    buttonState.back = "ui button";

    if (this.state.direction === "front") {
      buttonState.front = "positive ui button";
    } else if (this.state.direction === "back") {
      buttonState.back = "positive ui button";
    }

    return (
      <div className="ui two column centered grid">
        <div className="column">
          <div className="mini ui buttons">
            <button
              className={buttonState.front}
              onClick={() => this.imageRotated(article, "front")}
            >
              Front
            </button>
            <div className="or" />
            <button
              className={buttonState.back}
              onClick={() => this.imageRotated(article, "back")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  };
  // style={{ width: "250px", height: "300px" }}
  render() {
    return (
      <div className="card fluid">
        <div className="image">
          {this.renderLoader()}
          <img
            ref={this.imageRef}
            src={this.state.imageURL}
            alt={this.props.alt}
          />
        </div>
        <div className="content">
          {this.imageRotateOptions(this.state.imageURL, this.state.direction)}
        </div>
      </div>
    );
  }
}

export default ImageCard;
