import React from 'react'
import { connect } from 'react-redux'
import { getTeamImageStats, getTeamImages } from '../../actions/actionsImage'
import { Grid, Table } from 'semantic-ui-react'

import TeamImageList from './TeamImageList'

class TeamImageStats extends React.Component {
  componentDidMount() {
    this.props.getTeamImageStats()
  }

  handleClick(teamId) {
    this.props.getTeamImages(teamId)
  }

  renderTeamImageStats = () => {
    const { imageStats } = this.props
    return imageStats.map(stat => {
      return (
        <Table.Row key={stat._id} onClick={() => this.handleClick(stat._id)}>
          <Table.Cell>
            {stat.name},{stat.city},{stat.state}
            <br />
            {stat.mascot}
          </Table.Cell>
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
          <Grid.Column width={6}>
            <Table compact size="small" celled selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Team</Table.HeaderCell>
                  <Table.HeaderCell>Count</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{this.renderTeamImageStats()}</Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column width={10}>
            <TeamImageList />
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
  { getTeamImages, getTeamImageStats }
)(TeamImageStats)
