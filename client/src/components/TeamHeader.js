import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Image, Button, Grid, Header } from 'semantic-ui-react'

class TeamHeader extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return <div />
      case false:
        return (
          <Button as="a" href="/auth/google" basic size="small" color="red">
            <Grid columns={2}>
              <Grid.Column floated="left" width={4}>
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <path
                      d="M20.64 12.2c0-.63-.06-1.25-.16-1.84H12v3.49h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 21a8.6 8.6 0 0 0 5.96-2.18l-2.91-2.26a5.4 5.4 0 0 1-8.09-2.85h-3v2.33A9 9 0 0 0 12 21z"
                      fill="#34A853"
                    />
                    <path
                      d="M6.96 13.71a5.41 5.41 0 0 1 0-3.42V7.96h-3a9 9 0 0 0 0 8.08l3-2.33z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 6.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59A9 9 0 0 0 3.96 7.95l3 2.34A5.36 5.36 0 0 1 12 6.58z"
                      fill="#EA4335"
                    />
                  </g>
                </svg>
              </Grid.Column>
              <Grid.Column floated="right" width={10} verticalAlign="middle">
                <p>Log in</p>
              </Grid.Column>
            </Grid>
          </Button>
        )
      default:
        return <a href="/api/logout">Logout</a>
    }
  }
  render() {
    return (
      <Menu secondary pointing fluid>
        <Menu.Item as={Link} to="/">
          <Grid columns={2}>
            <Grid.Column width={6}>
              <Image
                size="tiny"
                src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg"
              />
            </Grid.Column>
            <Grid.Column verticalAlign="middle" textAlign="left" width={10}>
              <Header as="h4">TEAMS</Header>
            </Grid.Column>
          </Grid>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>{this.renderContent()}</Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps)(TeamHeader)
