import React, { useEffect } from "react";
import Header from "../Header";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <Header title="Our Recipes" bgClass="bg-image">
      <Button
        content="SEARCH RECIPES"
        color="primary"
        as={Link}
        to="/recipes"
        size="big"
      />
    </Header>
  );
};

export default Home;
