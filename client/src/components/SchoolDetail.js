import React from "react";
import { connect } from "react-redux";

class SchoolDetail extends React.Component {
  render() {
    const { team } = this.props.teamProducts || null;
    const { products } = this.props.teamProducts || null;
    if (!team) {
      return <div>Loading</div>;
    }
    console.log(products);
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
        <div className="ui fluid row images medium">
          <div className="column eight wide">
            <img src={products.home.jersey} alt={"Home Football Jersey"} />
          </div>
          <div className="column eight wide">
            <img src={products.away.jersey} alt={"Away Football Jersey"} />
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

export default connect(mapStateToProps)(SchoolDetail);
