import React, { useState, useEffect } from "react";
import { Form, Grid, Input, Message } from "semantic-ui-react";

const Search = ({ setSearchedQuery }) => {
  const [value, setValue] = useState("");
  // const [isRecipeFound, setIsRecipeFound] = useState(true);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  useEffect(() => {
    if (debouncedValue) {
      checkRecipes(debouncedValue);
      setSearchedQuery(debouncedValue);
    }
  }, [debouncedValue]);

  const checkRecipes = async (searchQuery) => {
    const dummyRecipes = ["potato", "pizza", "pasta"];
    const queries = searchQuery.split(",").map((item) => item.trim());

    const found = queries.some((query) => dummyRecipes.includes(query));
    // setIsRecipeFound(found);
  };

  return (
    <Grid column={2} textAlign="center" className="search-box">
      <Grid.Column>
        <h2 className="search-heading ">
          Search Recipes With
          <span style={{ color: "#2185D0" }}> Our Recipe</span>
        </h2>
        <h4>Input recipes separated by commas</h4>
        <Form>
          <Input
            placeholder="potato, pizza, pasta"
            action={{ icon: "search", color: "blue" }}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </Form>

        {/* Conditionally render the "No recipe found" message */}
        {/* {!isRecipeFound && (
          // <Message negative>
          //   <Message.Header>No recipe found</Message.Header>
          //   <p>Sorry, we couldn't find any matching recipes.</p>
          // </Message>
        )} */}
      </Grid.Column>
    </Grid>
  );
};

export default Search;
