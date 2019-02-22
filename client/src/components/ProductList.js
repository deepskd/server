import React from "react";
import { connect } from "react-redux";

import ImageCard from "./ImageCard";
import SchoolCard from "./SchoolCard";
import TabbedInputMenu from "./TabbedInputMenu";
import { selectTeam, fontChanged } from "../actions";

class ProductList extends React.Component {
  componentDidMount() {
    const { params } = this.props.match;
    const team = {};
    team._id = params.id;
    this.props.selectTeam(team, params.sports);
  }

  fontChanged(event) {
    this.props.fontChanged(event.target.value);
  }

  fontOptions(fonts) {
    return Object.keys(fonts).map(font => {
      return (
        <option key={font} value={font}>
          {fonts[font]}
        </option>
      );
    });
  }

  render() {
    const { team } = this.props.teamProducts || null;
    const { products } = this.props.teamProducts || null;
    if (!team) {
      return <div>Loading</div>;
    }
    return (
      <div className="ui fluid grid">
        <SchoolCard team={team} />
        <div className="left floated twelve wide column">
          <div className="ui grid">
            <div className="ui two cards">
              <ImageCard src={products.home.jersey} alt={"Home Jersey"} />
              <ImageCard src={products.away.jersey} alt={"Away Jersey"} />
            </div>
            <div className="ui two cards">
              <ImageCard src={products.home.pants} alt={"Home Pants"} />
              <ImageCard src={products.away.pants} alt={"Away Pants"} />
            </div>
          </div>
        </div>
        <div className="right floated four wide column">
          <form className="ui form" onSubmit={e => e.preventDefault()}>
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
              <TabbedInputMenu
                mascot={team.mascot.toUpperCase()}
                teamName={team.name.toUpperCase()}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    teamProducts: state.teamProducts
  };
};

export default connect(
  mapStateToProps,
  { selectTeam, fontChanged }
)(ProductList);
