import React from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, setFavorites, favorites }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);
  const isFavorite = favorites && favorites.find((fav) => fav === movieId);

  const addFavorite = () => {
    fetch(
      `https://sandoval-flixdb-eadce14b2925.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Error");
          return false;
        }
      })
      .then((favoriteMovies) => {
        alert("Added to your favorites!");
        console.log(favoriteMovies);
        setFavorites(favoriteMovies);
      })
      .catch((e) => {
        alert(e);
      });
  };

  const removeFavorite = (movieId) => {
    fetch(
      `https://sandoval-flixdb-eadce14b2925.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Error");
          return false;
        }
      })
      .then((favoriteMovies) => {
        alert("Removed from your favorites");
        console.log(favoriteMovies);
        setFavorites(favoriteMovies);
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div className="p-3 mb-2 bg-white text-dark">
      <div>
        <center>
          <img
            src={movie.ImagePath}
            alt={movie.Title}
            width={300}
            height={400}
          />
        </center>
      </div>

      <br></br>

      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>

      <br></br>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
        <br />
        <span>{movie.Director.Birth}</span>-<span>{movie.Director.Death}</span>
        <br />
        <span>{movie.Director.Bio}</span>
      </div>
      <br></br>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
        <br />
        <span>{movie.Genre.Description}</span>
      </div>
      <Link to="/">
        <Button className="back-button">Back</Button>
      </Link>
      {user ? (
        isFavorite ? (
          <Button
            onClick={() => removeFavorite(movieId)}
            style={{ marginTop: 15, marginLeft: 20 }}>
            Remove from Favorites
          </Button>
        ) : (
          <Button
            onClick={addFavorite}
            style={{ marginTop: 15, marginLeft: 20 }}>
            Add to Favorites
          </Button>
        )
      ) : null}
    </div>
  );
};
