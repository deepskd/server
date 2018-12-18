import React from "react";
import { connect } from "react-redux";

class SchoolDetail extends React.Component {
  state = { data: {} };

  updateColors = teamProd => {
    console.log(teamProd.team);

    const data = {
      home: {
        name: "",
        base: "sld_pn_black",
        textColor: "sld_dark_green_sp",
        textOutline: "sld_pn_white_sp"
      },
      away: {
        name: "",
        base: "sld_pn_white",
        textColor: "sld_pn_black_sp",
        outlineColor: "sld_dark_green_sp"
      },
      number: 78
    };

    data.home.name = "EAGLES";
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.updateColors(this.props.teamProducts);
  }
  render() {
    const { team } = this.props.teamProducts || null;
    if (!team) {
      return <div>Loading</div>;
    }
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="header">{team.name}</div>
        </div>
        <div className="content">
          <h4 className="ui sub header">
            {team.city},{team.state}
          </h4>
        </div>
        <div className="content">
          {team.mascot}
          <br />
          {team.colors}
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

export default connect(mapStateToProps)(SchoolDetail);
