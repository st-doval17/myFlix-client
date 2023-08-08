import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, updateUser }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);

  const [isFavorite, setIsFavorite] = useState(
    user && user.FavoriteMovies.includes(movieId)
  );

  const [favoriteMovies, setFavoriteMovies] = useState([]);
  useEffect(() => {
    if (user && user.Username) {
      fetch(
        `https://sandoval-flixdb-eadce14b2925.herokuapp.com/favoriteMovies/${user.Username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setFavoriteMovies(data);
        })
        .catch((error) => {
          console.error("API error:", error);
        });
    }
  }, [user, token]);

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
      .then((updatedUser) => {
        console.log("API response:", updatedUser);
        if (updatedUser) {
          alert("Added to your favorites!");
          setIsFavorite(true);
          updateUser(updatedUser);
        }
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
      .then((updatedUser) => {
        if (updatedUser) {
          alert("Removed from your favorites");
          setIsFavorite(false);
          updateUser(updatedUser);
        }
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
