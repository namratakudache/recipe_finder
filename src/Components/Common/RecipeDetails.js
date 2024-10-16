import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Grid,
  Button,
  Image,
  Header,
  Segment,
  TextArea,
  Icon,
} from "semantic-ui-react";
import { getRecipe } from "../Services/api";
import "../../styling/recipeDetails.css";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({});
  const [reviews, setReviews] = useState([]); // Reviews array
  const [newReview, setNewReview] = useState("");
  const [ratings, setRatings] = useState([]); // Ratings array
  const [hoverRatings, setHoverRatings] = useState([]); // Hover ratings array
  const [editIndex, setEditIndex] = useState(null); // Track which review is being edited

  const { recipeId } = useParams();

  useEffect(() => {
    const getData = async () => {
      let result = await getRecipe(recipeId);
      if (result && result.recipe) {
        setRecipe(result.recipe);
      }
    };
    getData();

    // Load reviews from local storage when the component mounts
    const storedReviews = localStorage.getItem(`reviews_${recipeId}`);
    if (storedReviews) {
      const parsedReviews = JSON.parse(storedReviews);
      setReviews(parsedReviews.reviews || []);
      setRatings(parsedReviews.ratings || []);
      setHoverRatings(parsedReviews.hoverRatings || []);
    }
  }, [recipeId]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview) {
      const updatedReviews = [...reviews];
      const updatedRatings = [...ratings];
      const updatedHoverRatings = [...hoverRatings];

      if (editIndex !== null) {
        // Update existing review
        updatedReviews[editIndex] = newReview;
        setEditIndex(null);
      } else {
        // Add new review
        updatedReviews.push(newReview);
        updatedRatings.push(0); // Default rating of 0
        updatedHoverRatings.push(0); // Default hover rating of 0
      }

      setReviews(updatedReviews);
      setRatings(updatedRatings);
      setHoverRatings(updatedHoverRatings);
      setNewReview(""); // Clear the input field

      // Save reviews to local storage
      localStorage.setItem(
        `reviews_${recipeId}`,
        JSON.stringify({
          reviews: updatedReviews,
          ratings: updatedRatings,
          hoverRatings: updatedHoverRatings,
        })
      );
    }
  };

  const handleStarClick = (reviewIndex, star) => {
    const newRatings = [...ratings];
    newRatings[reviewIndex] = star; // Set rating for this review
    setRatings(newRatings);

    // Save updated ratings to local storage
    localStorage.setItem(
      `reviews_${recipeId}`,
      JSON.stringify({
        reviews,
        ratings: newRatings,
        hoverRatings,
      })
    );
  };

  const handleStarHover = (reviewIndex, star) => {
    const newHoverRatings = [...hoverRatings];
    newHoverRatings[reviewIndex] = star; // Set hover rating for this review
    setHoverRatings(newHoverRatings);
  };

  const handleSubmitRating = (index) => {
    const submittedRating = ratings[index];
    if (submittedRating > 0) {
      // Display the submitted rating in the console or for debugging
      console.log(`Review: ${reviews[index]}, Rating: ${submittedRating}`);
      alert(
        `Submitted Rating for Review: "${reviews[index]}" with a rating of ${submittedRating}`
      );

      // Keep the rating after submission, just disable the submit button
      const updatedRatings = [...ratings];
      updatedRatings[index] = submittedRating; // Keep the submitted rating
      setRatings(updatedRatings); // Update the state with the correct rating

      // Save updated reviews and ratings to local storage
      localStorage.setItem(
        `reviews_${recipeId}`,
        JSON.stringify({
          reviews,
          ratings: updatedRatings,
          hoverRatings,
        })
      );
    } else {
      alert("Please select a rating before submitting.");
    }
  };

  const handleEditReview = (index) => {
    setNewReview(reviews[index]); // Set the current review text for editing
    setEditIndex(index); // Set the index of the review being edited
  };

  const handleDeleteReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    const updatedRatings = ratings.filter((_, i) => i !== index);
    const updatedHoverRatings = hoverRatings.filter((_, i) => i !== index);
    setReviews(updatedReviews);
    setRatings(updatedRatings);
    setHoverRatings(updatedHoverRatings);

    // Save updated reviews to local storage
    localStorage.setItem(
      `reviews_${recipeId}`,
      JSON.stringify({
        reviews: updatedReviews,
        ratings: updatedRatings,
        hoverRatings: updatedHoverRatings,
      })
    );
  };

  return Object.keys(recipe).length > 0 ? (
    <Grid container stackable columns={2} className="detailsPageContent">
      <Grid.Column>
        <Image src={recipe.image_url} />

        <Header size="large" content="Reviews" />
        {reviews.length > 0 ? (
          <Segment.Group>
            {reviews.map((review, index) => (
              <Segment key={index}>
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                  {/* Render 5 stars */}
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                      key={star}
                      name={
                        star <= (hoverRatings[index] || ratings[index])
                          ? "star"
                          : "star outline"
                      }
                      color="yellow"
                      size="small"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleStarClick(index, star)} // Set rating for this review
                      onMouseEnter={() => handleStarHover(index, star)} // Highlight on hover
                      onMouseLeave={() => handleStarHover(index, 0)} // Remove highlight on hover out
                    />
                  ))}
                  <div className="">
                    <p>{review}</p>
                  </div>
                </div>

                <Button
                  basic
                  color="green"
                  icon
                  onClick={() => handleSubmitRating(index)}
                  size="tiny"
                  disabled={ratings[index] === -1}
                  style={{ border: "none" }} // No border
                >
                  <Icon name="check" />
                  Post
                </Button>

                <Button
                  basic
                  color="blue"
                  icon
                  onClick={() => handleEditReview(index)}
                  size="tiny"
                  style={{ border: "none", marginLeft: 10 }} // No border
                >
                  <Icon name="edit" />
                </Button>

                <Button
                  basic
                  color="red"
                  icon
                  onClick={() => handleDeleteReview(index)}
                  size="tiny"
                  style={{ border: "none", marginLeft: 10 }} // No border
                >
                  <Icon name="delete" />
                </Button>
              </Segment>
            ))}
          </Segment.Group>
        ) : (
          <p>No reviews yet. Be the first to add one!</p>
        )}
      </Grid.Column>

      <Grid.Column>
        <Header size="medium">{recipe.title}</Header>
        <p>Provided By: {recipe.publisher}</p>
        <Button
          as={"a"}
          href={recipe.publisher_url}
          target="_blank"
          content="Publisher Webpage"
          color="blue"
        />
        <Button
          as={"a"}
          href={recipe.source_url}
          target="_blank"
          content="Recipe URL"
          color="green"
        />
        <Header size="large" content="Ingredients" />
        <Segment.Group>
          {recipe.ingredients &&
            recipe.ingredients.map((data, index) => (
              <Segment key={index}>
                <h5>{data}</h5>
              </Segment>
            ))}
        </Segment.Group>
        {/* Form to Add or Edit Review */}
        <Header size="large" content="Add a Review" style={{ marginTop: 20 }} />
        <form onSubmit={handleReviewSubmit}>
          <TextArea
            placeholder="Add your review here..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            style={{
              width: "100%",
              height: "150px",
              padding: "10px",
              fontSize: "16px",
            }}
          />
          <Button
            type="submit"
            content={editIndex !== null ? "Update Review" : "Submit"}
            color="blue"
            style={{ margin: 20 }}
          />
        </form>
      </Grid.Column>
    </Grid>
  ) : null;
};

export default RecipeDetails;
