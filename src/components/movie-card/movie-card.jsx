import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onAddFavorite }) => {
  const handleAddClick = () => {
    if (onAddFavorite) {
      onAddFavorite(movie._id);
    }
  };

  return (
    <Card className="h-100">
      <Card.Img className="flex-grow-1" variant="top" src={movie.ImagePath} />
      <Card.Body className="p-3 bg-white text-dark">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button>Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string,
    Title: PropTypes.string,
    Description: PropTypes.string,
    Director: PropTypes.shape({
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string,
      Name: PropTypes.string,
    }).isRequired,
    Genre: PropTypes.shape({
      Description: PropTypes.string,
      Name: PropTypes.string,
    }),
  }).isRequired,
};
