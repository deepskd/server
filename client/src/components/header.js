import React from "react";
import { Link } from "react-router-dom";
import { Menu, Image, Button, Icon } from "semantic-ui-react";

const Header = () => {
  return (
    <Menu secondary pointing fluid>
      <Menu.Item as={Link} to="/">
        <Image
          ui={false}
          src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg"
        />
        TEAMS
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Button color="google plus">
            <Icon name="google plus" />
            Sign in with Google
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
