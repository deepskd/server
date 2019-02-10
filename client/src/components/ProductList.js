import React from "react";
import { connect } from "react-redux";

import ImageCard from "./ImageCard";
import SchoolCard from "./SchoolCard";
import { fontChanged } from "../actions";

class ProductList extends React.Component {
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

        <div className="left floated fourteen wide column">
          <div className="ui grid">
            <div className="ui two cards">
              <ImageCard
                src={products.home.jersey}
                alt={"Home Football Jersey"}
              />
              <ImageCard
                src={products.away.jersey}
                alt={"Away Football Jersey"}
              />
            </div>
            <div className="ui two cards">
              <ImageCard
                src={products.home.pants}
                alt={"Home Football Pants"}
              />
              <ImageCard
                src={products.away.pants}
                alt={"Away Football Pants"}
              />
            </div>
          </div>
        </div>
        <div className="right floated two wide column">
          Font Selector
          <select
            className="ui dropdown"
            onChange={event => this.fontChanged(event)}
            value={products.selectedFont}
          >
            {this.fontOptions(products.fonts)}
          </select>
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
  { fontChanged }
)(ProductList);
