import React from 'react'
import { connect } from 'react-redux'

import ImageCard from './ImageCard'
import SchoolCard from './SchoolCard'
import EmbellishmentSwitch from './designMenu/EmbellishmentSwitch'
import DesignMenu from './designMenu/DesignMenu'
import { selectTeam, fontChanged } from '../actions'

import { Grid, Button, Form } from 'semantic-ui-react'

class ProductList extends React.Component {
  componentDidMount() {
    const { history } = this.props
    if (history.action === 'POP') {
      const { params } = this.props.match
      const team = {}
      team._id = params.id
      this.props.selectTeam(team, params.sports)
    }
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
    const { baseOptions } = this.props.teamProducts.products

    return (
      <React.Fragment>
        <div className="ui two cards">
          <ImageCard
            src={home.jersey}
            alt="home_jersey"
            baseOptions={baseOptions.jersey}
            onSelect={selected => this.onCardSelect('home_jersey', selected)}
          />
          <ImageCard
            src={away.jersey}
            alt="away_jersey"
            baseOptions={baseOptions.jersey}
            onSelect={selected => this.onCardSelect('away_jersey', selected)}
          />
        </div>
        <div className="ui two cards">
          <ImageCard
            src={home.pant}
            alt="home_pant"
            baseOptions={baseOptions.pant}
            onSelect={selected => this.onCardSelect('home_pant', selected)}
          />
          <ImageCard
            src={away.pant}
            alt="away_pant"
            baseOptions={baseOptions.pant}
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
            <Form onSubmit={e => e.preventDefault()}>
              <Form.Field style={football}>
                <EmbellishmentSwitch team={team} />
              </Form.Field>
              <Form.Field>
                <label>Font</label>
                <select
                  className="ui dropdown"
                  onChange={event => this.fontChanged(event)}
                  value={products.selectedFont}
                >
                  {this.fontOptions(products.fonts)}
                </select>
              </Form.Field>
              <Form.Field>
                <DesignMenu products={products} />
              </Form.Field>
            </Form>
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
