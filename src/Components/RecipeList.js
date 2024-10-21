import { Container, Header, Grid } from "semantic-ui-react";
import RecipeListItem from "./Card/RecipeListItem";
const RecipeList = ({ recipes, searchedQuery }) => {
  return (
    <Container>
      <Header
        textAlign="center"
        size="huge"
        content={`RecipeList for ${searchedQuery}`}
      />
      <Grid columns={4} doubling>
        {recipes &&
          recipes.map((recipe) => (
            <Grid.Column>
              <RecipeListItem recipe={recipe} />
            </Grid.Column>
          ))}
      </Grid>
    </Container>
  );
};

export default RecipeList;
