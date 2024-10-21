import React, { useEffect, useState } from "react";
import RecipeList from "../Components/RecipeList";
import Search from "./Search";
import { getRecipes } from "./Services/api";

const Recipes = () => {
  const [searchedQuery, setSearchedQuery] = useState("Pizza");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getSearchedResult();
  }, [searchedQuery]);

  const getSearchedResult = async () => {
    let result = await getRecipes(searchedQuery);
    if (result && result.recipes) {
      setRecipes(result.recipes);
      console.log(result.recipes);
    }
  };
  return (
    <>
      <Search setSearchedQuery={setSearchedQuery} />
      <RecipeList recipes={recipes} searchedQuery={searchedQuery} />
    </>
  );
};

export default Recipes;
