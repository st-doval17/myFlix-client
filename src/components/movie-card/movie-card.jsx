import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}>
      {movie.title}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    director: PropTypes.shape({
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string,
      Name: PropTypes.string,
    }).isRequired,
    genre: PropTypes.shape({
      Description: PropTypes.string,
      Name: PropTypes.string,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
