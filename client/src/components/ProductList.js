import React from "react";
import { connect } from "react-redux";

import ImageCard from "./ImageCard";
import SchoolCard from "./SchoolCard";
import EmbellishmentSwitch from "./designMenu/EmbellishmentSwitch";
import JerseyText from "./designMenu/JerseyText";
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
  renderProducts({ home, away }) {
    return (
      <React.Fragment>
        <div className="ui two cards">
          <ImageCard src={home.jersey.frontImage} alt={"Home Jersey"} />
          <ImageCard src={away.jersey.frontImage} alt={"Away Jersey"} />
        </div>
        <div className="ui two cards">
          <ImageCard src={home.pant.frontImage} alt={"Home Pant"} />
          <ImageCard src={away.pant.frontImage} alt={"Away Pant"} />
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { team } = this.props.teamProducts || null;
    const { products } = this.props.teamProducts || null;
    const { params } = this.props.match;
    const football = params.sports === "football" ? {} : { display: "none" };

    if (!team) {
      return <div>Loading</div>;
    }
    return (
      <div className="ui fluid grid">
        <SchoolCard team={team} />
        <div className="left floated twelve wide column">
          <div className="ui grid">{this.renderProducts(products)}</div>
        </div>
        <div className="right floated four wide column">
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
