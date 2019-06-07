import React from 'react'
import { connect } from 'react-redux'
import {
  getRetailerImageStats,
  getRetailerImages,
} from '../../actions/actionsImage'
import { Grid, Table } from 'semantic-ui-react'

import ImageList from './ImageList'

class ImageStats extends React.Component {
  componentDidMount() {
    this.props.getRetailerImageStats()
  }

  handleClick(retailerId) {
    this.props.getRetailerImages(retailerId)
  }

  renderRetailerImageStats = () => {
    const { imageStats } = this.props
    return imageStats.map(stat => {
      return (
        <Table.Row key={stat._id} onClick={() => this.handleClick(stat._id)}>
          <Table.Cell>{stat._id}</Table.Cell>
          <Table.Cell>{stat.count}</Table.Cell>
        </Table.Row>
      )
    })
  }

  render() {
    const { imageStats } = this.props
    if (imageStats.length === 0) {
      return <React.Fragment />
    }
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={4}>
            <Table celled selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Retailer ID</Table.HeaderCell>
                  <Table.HeaderCell>Count</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{this.renderRetailerImageStats()}</Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column width={12}>
            <ImageList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    imageStats: state.imageStats,
  }
}

export default connect(
  mapStateToProps,
  { getRetailerImageStats, getRetailerImages }
)(ImageStats)
