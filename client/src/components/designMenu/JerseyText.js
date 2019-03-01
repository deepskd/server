import React from "react";
import { connect } from "react-redux";
import { Input, Menu, Segment, Button } from "semantic-ui-react";
import { jerseyTextChanged } from "../../actions";

class JerseyText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "home",
      jerseyText: {
        home: this.props.mascot,
        away: this.props.teamName
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.mascot !== this.props.mascot ||
      nextProps.teamName !== this.props.teamName
    ) {
      this.setState({
        jerseyText: { home: nextProps.mascot, away: nextProps.teamName }
      });
    }
  }

  handleInputChange = event => {
    const { activeTab, jerseyText } = this.state;
    const text = Object.assign({}, jerseyText);
    text[activeTab] = event.target.value.toUpperCase();
    this.setState({ jerseyText: text });
  };

  handleTextUpdate = event => {
    const { activeTab, jerseyText } = this.state;
    const updateText = {};
    updateText[activeTab] = jerseyText[activeTab];
    this.props.jerseyTextChanged(updateText);
  };

  render() {
    const { activeTab, jerseyText } = this.state;

    return (
      <div>
        <Menu attached="top" tabular size="mini">
          <Menu.Item
            name="home"
            active={activeTab === "home"}
            onClick={() => this.setState({ activeTab: "home" })}
          />
          <Menu.Item
            name="away"
            active={activeTab === "away"}
            onClick={() => this.setState({ activeTab: "away" })}
          />
        </Menu>

        <Segment attached="bottom">
          <form onSubmit={e => e.preventDefault()} className="ui form">
            <Input action fluid>
              <input
                type="text"
                value={jerseyText[activeTab]}
                onChange={e => this.handleInputChange(e)}
              />
              <Button
                icon={{ name: "edit", color: "blue" }}
                onClick={e => this.handleTextUpdate(e)}
              />
            </Input>
          </form>
        </Segment>
      </div>
    );
  }
}

export default connect(
  null,
  { jerseyTextChanged }
)(JerseyText);
