import React from "react";
import { connect } from "react-redux";

import ImageCard from "./ImageCard";
import SchoolCard from "./SchoolCard";
import { fontChanged, jerseyTextChanged } from "../actions";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mascot: "", teamName: "" };
  }
  onTextChange(obj) {
    const attr = Object.keys(obj)[0];
    switch (attr) {
      case "mascot":
        this.setState({ mascot: obj["mascot"].target.value });
        break;
      case "teamName":
        this.setState({ teamName: obj["teamName"].target.value });
        break;
      default:
        console.log("should not get here");
    }
  }

  textUpdated(element) {
    switch (element) {
      case "mascot":
        this.props.jerseyTextChanged({ home: this.state.mascot });
        break;
      case "teamName":
        this.props.jerseyTextChanged({ away: this.state.teamName });
        break;
      default:
        console.log("Should not get here");
    }
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
              <label>Home Jersey Text</label>
              <div className="ui action input">
                <input
                  type="text"
                  placeholder={team.mascot}
                  value={this.state.mascot}
                  onChange={e => this.onTextChange({ mascot: e })}
                />
                <button
                  className="ui button"
                  onClick={event => this.textUpdated("mascot")}
                >
                  Update
                </button>
              </div>
            </div>
            <div className="field">
              <label>Away Jersey Text</label>
              <div className="ui action input">
                <input
                  type="text"
                  placeholder={team.name}
                  value={this.state.teamName}
                  onChange={e => this.onTextChange({ teamName: e })}
                />
                <button
                  className="ui button"
                  onClick={event => this.textUpdated("teamName")}
                >
                  Update
                </button>
              </div>
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
  { fontChanged, jerseyTextChanged }
)(ProductList);
