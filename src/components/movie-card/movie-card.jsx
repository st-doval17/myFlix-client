import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body class="p-3 mb-2 bg-white text-dark">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="primary">
          Open
        </Button>
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
  onMovieClick: PropTypes.func.isRequired,
};
