import "./SchoolDetail.css";
import React from "react";
import { connect } from "react-redux";

import ImageCard from "./ImageCard";
import { fontChanged, imageRotated } from "../actions";

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

  imageRotated(jersey, direction) {
    this.props.imageRotated(jersey, direction);
  }

  imageRotateOptions(jersey, direction) {
    let buttonState = {};
    buttonState.front = "ui button";
    buttonState.back = "ui button";

    if (direction === "front") {
      buttonState.front = "positive ui button";
    } else if (direction === "back") {
      buttonState.back = "positive ui button";
    }

    return (
      <div className="column eight wide">
        <div className="ui two column centered grid">
          <div className="column">
            <div className="mini ui buttons">
              <button
                className={buttonState.front}
                onClick={() => this.imageRotated(jersey, "front")}
              >
                Front
              </button>
              <div className="or" />
              <button
                className={buttonState.back}
                onClick={() => this.imageRotated(jersey, "back")}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
        <div className="ui fluid centered row images medium">
          <ImageCard src={products.home.jersey} alt={"Home Football Jersey"} />
          <ImageCard src={products.away.jersey} alt={"Away Football Jersey"} />
        </div>
        <div className="ui fluid row">
          {this.imageRotateOptions("home", products.home.jerseyDirection)}
          {this.imageRotateOptions("away", products.away.jerseyDirection)}
        </div>
        <div className="ui fluid centered row images medium">
          <ImageCard src={products.home.pants} alt={"Home Football Pants"} />
          <ImageCard src={products.away.pants} alt={"Away Football Pants"} />
        </div>
        <div className="ui fluid centered row">
          {this.fontOptions(products.fonts, products.selectedFont)}
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
  { fontChanged, imageRotated }
)(SchoolDetail);
