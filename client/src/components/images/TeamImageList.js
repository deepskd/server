import React from "react";
import { connect } from "react-redux";
import { Card, Image } from "semantic-ui-react";

class ImageList extends React.Component {
  renderImages = images => {
    return images.map((image, index) => {
      return (
        <Card key={index}>
          <Image wrapped ui={false}>
            <img src={image.previewImageURL} alt={"home"} />
          </Image>
          <Card.Content>
            <Card.Meta>
              {image.meta.orderName}-{image.meta.crestName}
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>{image.meta.orderNo}</Card.Content>
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
        <Card.Group itemsPerRow={6}>{this.renderImages(images)}</Card.Group>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { images: state.images };
};
export default connect(mapStateToProps)(ImageList);
