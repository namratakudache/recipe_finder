import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { logo } from "../Constants/constant";
import { Link } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth(); 

 
  if (!isAuthenticated) {
    return null; 
  }

  return (
    <Menu borderless fixed="top">
      <Menu.Item>
        <img src={logo} alt="logo" style={{ width: 70 }} />
      </Menu.Item>
      <Menu.Item name="Home" as={Link} to="/" />
      <Menu.Item name="Recipes" as={Link} to="/recipes" />

   
      <Menu.Menu position="right">
        {isAuthenticated ? (
          <>
            <Menu.Item name={`Hello, ${user.username}`} />
            <Menu.Item>
              <Button onClick={logout}>Logout</Button>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item as={Link} to="/login">
            <Button>Login</Button>
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
