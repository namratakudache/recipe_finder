import { Link } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import "./card.css";

const RecipeListItem = ({ recipe }) => {
  return (
    <Card className="recipe-card">
      <img src={recipe.image_url} alt="thumbnail" style={{ height: 180 }} />
      <Card.Content>
        <Card.Header content={recipe.title} />
        <Card.Description>
          <h4>{recipe.publisher}</h4>
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <Button
          as={Link}
          to={`/recipes/${recipe.recipe_id}`}
          content="Details"
          color="blue"
          size="tiny"
        />
        <Button
          href={recipe.source_url}
          target="_blank"
          content="Recipe URL"
          color="green"
          size="tiny"
        />
      </Card.Content>
    </Card>
  );
};

export default RecipeListItem;
