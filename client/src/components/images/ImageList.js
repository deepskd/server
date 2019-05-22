import React from "react";
import { connect } from "react-redux";
import {
  Card,
  Image,
  Checkbox,
  Segment,
  List,
  Button
} from "semantic-ui-react";

import { findTeams } from "../../actions";
import { assignImagesToTeam } from "../../actions/actionsImage";

class ImageList extends React.Component {
  state = { selectedImages: [], term: "" };

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

  isSelected = id => this.state.selectedImages.includes(id);

  onInputChange = event => {
    this.setState({ term: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.findTeams(this.state.term);
  };

  assignImagestoTeam = teamId => {
    const updateImages = {};
    const { selectedImages } = this.state;

    updateImages.selectedImageIds = selectedImages;
    updateImages.teamId = teamId;

    this.props.assignImagesToTeam(updateImages);
    this.setState({ selectedImages: [], term: "" });
  };

  renderImages = images => {
    return images.map((image, index) => {
      return (
        <Card key={index} color={image.teamId ? "green" : "red"}>
          <Image wrapped ui={false}>
            <div className="ui right floated">
              <Checkbox
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

  renderTeams = () => {
    if (!this.props.teams) {
      return null;
    }
    return this.props.teams.map(team => {
      return (
        <List.Item key={team._id}>
          <List.Content floated="right">
            <Button
              size="tiny"
              onClick={() => this.assignImagestoTeam(team._id)}
            >
              Assign
            </Button>
          </List.Content>
          <List.Content>
            <List.Header>{team.name}</List.Header>
            <List.Description>
              {team.city},{team.state}
            </List.Description>
            {team.mascot}
          </List.Content>
        </List.Item>
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
        <Segment>
          <div className="ui search">
            <form onSubmit={this.onFormSubmit} className="ui form">
              <div className="ui fluid action input">
                <input
                  type="text"
                  value={this.state.term}
                  onChange={this.onInputChange}
                  placeholder="School, State Code(optional)"
                />
                <button
                  className="ui primary icon button"
                  onClick={this.onFormSubmit}
                  type="submit"
                >
                  <i className="search icon" />
                  Search
                </button>
              </div>
            </form>
          </div>
          <List divided relaxed>
            {this.renderTeams()}
          </List>
        </Segment>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { images: state.images, teams: state.teams };
};
export default connect(
  mapStateToProps,
  { findTeams, assignImagesToTeam }
)(ImageList);
