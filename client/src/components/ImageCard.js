import React from "react";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);

    this.imageRef = React.createRef();
  }

  componentDidMount() {
    console.log(this.imageRef);
  }

  render() {
    return (
      <div className="column eight wide">
        <img ref={this.imageRef} src={this.props.src} alt={this.props.alt} />
      </div>
    );
  }
}

export default ImageCard;
