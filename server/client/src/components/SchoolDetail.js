import React from "react";
import { connect } from "react-redux";

class SchoolDetail extends React.Component {
  render() {
    console.log(this.props.teamProducts);
    return <div>School Detail</div>;
  }
}

const mapStateToProps = state => {
  return {
    teamProducts: state.teamProducts
  };
};

export default connect(mapStateToProps)(SchoolDetail);
