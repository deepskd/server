import React from "react";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.hideLoader);
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

  render() {
    return (
      <div className="column eight wide">
        {this.renderLoader()}
        <img ref={this.imageRef} src={this.props.src} alt={this.props.alt} />
      </div>
    );
  }
}

export default ImageCard;
