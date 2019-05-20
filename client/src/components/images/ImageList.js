import React from "react";
import { connect } from "react-redux";
import { Card, Image, Checkbox } from "semantic-ui-react";

class ImageList extends React.Component {
  state = { selectedImages: [] };

  onImageSelect = id => {
    const { selectedImages } = this.state;
    if (selectedImages.includes(id)) {
      selectedImages.pop(id);
      this.setState({ selectedImages });
    } else {
      selectedImages.push(id);
      this.setState({ selectedImages });
    }
  };

  isSelected = id => {
    const { selectedImages } = this.state;
    console.log(selectedImages, selectedImages.includes(id));
    return selectedImages.includes(id);
  };

  renderImages = images => {
    return images.map((image, index) => {
      return (
        <Card key={index}>
          <Image wrapped ui={false}>
            <div className="ui right floated">
              <Checkbox
                floated
                onClick={() => this.onImageSelect(image._id)}
                checked={this.isSelected(image._id)}
              />
            </div>
            <img src={image.previewImageURL} alt={"home"} />
          </Image>
          <Card.Content>
            <Card.Meta>{image.meta.orderName}</Card.Meta>
          </Card.Content>
        </Card>
      );
    });
  };
  render() {
    const { images } = this.props;
    if (images.length === 0) {
      return <React.Fragment />;
    }

    return (
      <React.Fragment>
        <Card.Group itemsPerRow={4}>{this.renderImages(images)}</Card.Group>
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
