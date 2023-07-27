import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://sandoval-flixdb-eadce14b2925.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            ImagePath: movie.ImagePath,
            Title: movie.Title,
            Description: movie.Description,
            Director: {
              Bio: movie.Director.Bio,
              Birth: movie.Director.Birth,
              Death: movie.Director.Death,
              Name: movie.Director.Name,
            },
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description,
            },
          };
        });

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <Row>
      {!user ? (
        <>
          <Col md={5}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            or
            <SignupView />
          </Col>
        </>
      ) : selectedMovie ? (
        <Row>
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
          <Col>
            <Button
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}>
              Logout
            </Button>
          </Col>
        </Row>
      ) : movies.length === 0 ? (
        <>
          <Row>
            <Col>
              <Button
                className="position-absolute top-0 end-0"
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}>
                Logout
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>The list is empty!</div>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row>
            <Col>
              <Button
                className="position-absolute top-0 end-0"
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}>
                Logout
              </Button>
            </Col>
          </Row>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};

<Button
  onClick={() => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  }}>
  Logout
</Button>;
