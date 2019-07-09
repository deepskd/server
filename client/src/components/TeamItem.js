import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Item, List, Icon } from 'semantic-ui-react'

import { selectTeam } from '../actions'

class TeamItem extends React.Component {
  onTeamSelect(team, sports) {
    this.props.selectTeam(team, sports)
  }
  render() {
    const { team } = this.props

    return (
      <Item>
        <Item.Header as="h4">{team.name}</Item.Header>
        <Item.Content verticalAlign="top">
          <div className="right floated">{team.mascot}</div>
        </Item.Content>
        <Item.Content>
          {team.city},{team.state}
        </Item.Content>
        <List horizontal>
          <List.Item
            as={Link}
            to={`/football/${this.props.team._id}`}
            onClick={() => this.onTeamSelect(team, 'football')}
          >
            <Icon name="football ball" color="blue" />
            Football
          </List.Item>
          <List.Item
            as={Link}
            to={`/basketball/${this.props.team._id}`}
            onClick={() => this.onTeamSelect(team, 'basketball')}
          >
            <Icon name="basketball ball" color="blue" />
            Basketball
          </List.Item>
          <List.Item
            as={Link}
            to={`/volleyball/${this.props.team._id}`}
            onClick={() => this.onTeamSelect(team, 'volleyball')}
          >
            <Icon name="volleyball ball" color="blue" />
            Volleyball
          </List.Item>
        </List>
      </Item>
    )
  }
}

export default connect(
  null,
  { selectTeam }
)(TeamItem)
