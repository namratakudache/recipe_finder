import React from "react";
import Header from "../Components/Common/Header";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

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
