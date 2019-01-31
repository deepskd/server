import React from "react";
import { connect } from "react-redux";

import ImageCard from "./ImageCard";
import { fontChanged } from "../actions";

class SchoolDetail extends React.Component {
  fontChanged(font) {
    this.props.fontChanged(font);
  }

  fontOptions(fonts, selectedFont) {
    return Object.keys(fonts).map(font => {
      if (font === selectedFont) {
        return (
          <button key={font} className="positive ui button">
            {fonts[font]}
          </button>
        );
      } else {
        return (
          <button
            key={font}
            className="ui button"
            onClick={() => this.fontChanged(font)}
          >
            {fonts[font]}
          </button>
        );
      }
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
        <div className="ui row centered card">
          <div className="content">
            <div className="header">{team.name}</div>
            <h4 className="meta">
              {team.city},{team.state}
            </h4>
          </div>
          <div className="content">
            {team.mascot}
            <br />
            {team.colors}
          </div>
        </div>

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
          <div className="ui vertical mini buttons">
            {this.fontOptions(products.fonts, products.selectedFont)}
          </div>
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
)(SchoolDetail);
