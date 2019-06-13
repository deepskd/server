import React from 'react'
import { connect } from 'react-redux'

import ImageCard from './ImageCard'
import SchoolCard from './SchoolCard'
import EmbellishmentSwitch from './designMenu/EmbellishmentSwitch'
import JerseyText from './designMenu/JerseyText'
import ColorOptions from './designMenu/ColorOptions'
import { selectTeam, fontChanged } from '../actions'

import { Grid, Button } from 'semantic-ui-react'

class ProductList extends React.Component {
  componentDidMount() {
    const { params } = this.props.match
    const team = {}
    team._id = params.id
    this.props.selectTeam(team, params.sports)
  }

  fontChanged(event) {
    this.props.fontChanged(event.target.value)
  }

  fontOptions(fonts) {
    return Object.keys(fonts).map(font => {
      return (
        <option key={font} value={font}>
          {fonts[font]}
        </option>
      )
    })
  }

  onCardSelect = (article, selected) => {
    console.log('in Product List', article, ' ', selected)
  }

  renderProducts({ home, away }) {
    return (
      <React.Fragment>
        <div className="ui two cards">
          <ImageCard
            src={home.jersey}
            alt={'Home Jersey'}
            onSelect={selected => this.onCardSelect('home_jersey', selected)}
          />
          <ImageCard
            src={away.jersey}
            alt={'Away Jersey'}
            onSelect={selected => this.onCardSelect('away_jersey', selected)}
          />
        </div>
        <div className="ui two cards">
          <ImageCard
            src={home.pant}
            alt={'Home Pant'}
            onSelect={selected => this.onCardSelect('home_pant', selected)}
          />
          <ImageCard
            src={away.pant}
            alt={'Away Pant'}
            onSelect={selected => this.onCardSelect('away_pant', selected)}
          />
        </div>
      </React.Fragment>
    )
  }

  render() {
    const { team } = this.props.teamProducts || null
    const { products } = this.props.teamProducts || null
    const { params } = this.props.match
    const football = params.sports === 'football' ? {} : { display: 'none' }

    if (!team) {
      return <div>Loading</div>
    }
    return (
      <Grid>
        <SchoolCard team={team} />
        <Grid.Row>
          <Grid.Column width={12} floated="left">
            <Grid>{this.renderProducts(products)}</Grid>
          </Grid.Column>
          <Grid.Column width={4} floated="right">
            <form className="ui form" onSubmit={e => e.preventDefault()}>
              <div className="field" style={football}>
                <EmbellishmentSwitch team={team} />
              </div>
              <div className="field">
                <label>Font</label>
                <select
                  className="ui dropdown"
                  onChange={event => this.fontChanged(event)}
                  value={products.selectedFont}
                >
                  {this.fontOptions(products.fonts)}
                </select>
              </div>
              <div className="field">
                <label>Jersey Text</label>
                <JerseyText
                  mascot={team.mascot.toUpperCase()}
                  teamName={team.name.toUpperCase()}
                />
              </div>
              <div className="field">
                <label>Colors</label>
                <ColorOptions
                  mascot={team.mascot.toUpperCase()}
                  teamName={team.name.toUpperCase()}
                  products={products}
                />
              </div>
            </form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column floated="right">
            <Button primary>Add to Cart</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    teamProducts: state.teamProducts,
  }
}

export default connect(
  mapStateToProps,
  { selectTeam, fontChanged }
)(ProductList)
