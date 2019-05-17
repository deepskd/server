import React from "react";
import { connect } from "react-redux";
import { Image } from "semantic-ui-react";

class ImageList extends React.Component {
  renderImages = images => {
    return images.map((image, index) => {
      return <Image key={index} src={image.previewImageURL} />;
    });
  };
  render() {
    const { images } = this.props;
    if (images.length === 0) {
      return <React.Fragment />;
    }

    return (
      <React.Fragment>
        <Image.Group size="small">{this.renderImages(images)}</Image.Group>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { images: state.images };
};
export default connect(
  mapStateToProps,
  null
)(ImageList);
