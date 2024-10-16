import React, { useState } from "react";
import { Form, Grid, Input, Message } from "semantic-ui-react";

const Search = ({ setSearchedQuery }) => {
  const [value, setValue] = useState("");

  const onFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setSearchedQuery(value);
  };

  const checkRecipes = async (searchQuery) => {
    // Simulate an API call to check for existing recipes
    // Replace this with your actual API call
    const dummyRecipes = ["potato", "pizza", "pasta"]; // Example list of recipes
    const queries = searchQuery.split(",").map((item) => item.trim());

    // Check if any of the queries match the dummy recipes
    return queries.some((query) => dummyRecipes.includes(query));
  };

  return (
    <Grid column={2} textAlign="center" className="search-box">
      <Grid.Column>
        <h2 className="search-heading ">
          Search Recipes With
          <span style={{ color: "#2185D0" }}> Our Recipe</span>
        </h2>
        <h4>Input recipes separated by commas</h4>
        <Form onSubmit={onFormSubmit}>
          <Input
            placeholder="potato, pizza, pasta"
            action={{ icon: "search", color: "blue" }}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Search;
