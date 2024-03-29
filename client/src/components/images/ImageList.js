import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Card, Image, Checkbox, Segment, List, Button, Grid, Pagination } from 'semantic-ui-react'

import { findTeams } from '../../actions'
import { assignImagesToTeam, getRetailerImages } from '../../actions/actionsImage'

class ImageList extends React.Component {
  state = { selectedImages: [], term: '', activePage: 1 }

  onImageSelect = id => {
    const { selectedImages } = this.state
    if (selectedImages.includes(id)) {
      selectedImages.pop(id)
      this.setState({ selectedImages })
    } else {
      selectedImages.push(id)
      this.setState({ selectedImages })
    }
  }

  isSelected = id => this.state.selectedImages.includes(id)

  onInputChange = event => {
    this.setState({ term: event.target.value })
  }

  onFormSubmit = event => {
    event.preventDefault()
    this.props.findTeams(this.state.term)
  }

  assignImagestoTeam = teamId => {
    const updateImages = {}
    const { selectedImages, activePage } = this.state
    const { images } = this.props

    updateImages.selectedImageIds = selectedImages
    updateImages.teamId = teamId

    this.props.assignImagesToTeam(updateImages, images.data[0].retailerId, activePage)
    this.setState({ selectedImages: [], term: '', activePage })
  }

  handlePaginationChange = (e, { activePage }) => {
      const retailerId = this.props.images.data[0].retailerId 
      this.setState({ activePage })
      this.props.getRetailerImages(retailerId, activePage) 
  }

  renderImages = images => {
    return images.map((image, index) => {
      return (
        <Card key={index} color={image.teamId ? 'green' : 'red'}>
          <Image wrapped ui={false}>
            <div className="ui right floated">
              <Checkbox
                onClick={() => this.onImageSelect(image._id)}
                checked={this.isSelected(image._id)}
              />
            </div>
            <img src={image.previewImageURL} alt={'home'} />
          </Image>
          <Card.Content>
            <Card.Meta>
              {image.meta.orderName}-{image.meta.crestName}
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>{image.meta.orderNo}</Card.Content>
        </Card>
      )
    })
  }

  renderTeams = () => {
    if (!this.props.teams) {
      return null
    }
    return this.props.teams.map(team => {
      const disabledAssign =
        this.state.selectedImages.length === 0 ? true : false
      return (
        <List.Item key={team._id}>
          <List.Content floated="right">
            <Button
              disabled={disabledAssign}
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
      )
    })
  }

  render() {
    const { images } = this.props
    if (_.isEmpty(images)) {
      return <React.Fragment />
    }

    const totalPages = images.count ? (Number.parseInt(images.count / 24)) + 1 :1

    return (
      <React.Fragment>
        <Grid columns={1}>
          <Grid.Column floated="left">
            <Pagination
              size="mini"
              activePage={this.state.activePage}
              onPageChange={this.handlePaginationChange}
              totalPages={totalPages}
              prevItem={null}
              lastItem={null}
            />

          </Grid.Column>
          <Grid.Column>
            <Card.Group itemsPerRow={6}>{this.renderImages(images.data)}</Card.Group>
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
          </Grid.Column>
        </Grid>
       
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return { images: state.images, teams: state.teams }
}
export default connect(
  mapStateToProps,
  { findTeams, assignImagesToTeam, getRetailerImages }
)(ImageList)
