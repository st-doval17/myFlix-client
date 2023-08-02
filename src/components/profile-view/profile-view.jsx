import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export const ProfileView = ({
  user,
  token,
  movies,
  updateUser,
  onLoggedOut,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const favoriteMovies = movies.filter((movie) =>
    user.FavoriteMovies.includes(movie._id)
  );

  const favoriteMoviesChunks = [];
  for (let i = 0; i < favoriteMovies.length; i += 5) {
    favoriteMoviesChunks.push(favoriteMovies.slice(i, i + 4));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(
      "https://sandoval-flixdb-eadce14b2925.herokuapp.com/users/${user.userName}",
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Update failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Update Successful");
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const deleteUser = () => {
    fetch(
      "https://sandoval-flixdb-eadce14b2925.herokuapp.com/users/${user.userName}",
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("User has been deleted");
          onLoggedOut();
        } else {
          alert("Delete failed");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <div>
        <Card className="h-100">
          <Card.Body className="p-3 bg-white text-dark">
            <Card.Title>Update Info:</Card.Title>

            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" style={{ marginTop: 18, float: "right" }}>
                Submit Changes
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>

      <Card style={{ marginTop: 40 }}>
        <Card.Body className="p-3 bg-white text-dark">
          <Card.Title>User Info:</Card.Title>
          <center>
            <p>Username: {user.Username}</p>
            <p>Email: {user.Email}</p>
            <p>Birthday: {new Date(user.Birthday).toLocaleDateString()}</p>
          </center>
          <div>
            <Button
              onClick={() => {
                if (confirm("Are you sure you want to delete your account?")) {
                  deleteUser();
                }
              }}
              style={{ marginTop: 10, float: "right" }}>
              Delete Account
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Col style={{ marginTop: 30, marginBottom: 15 }}>
        <h5 className="text-white">Your Favorites:</h5>
      </Col>

      {favoriteMoviesChunks.map((chunk, index) => (
        <Container
          key={index}
          className="d-flex justify-content-center mb-3"
          style={{ border: "2px solid #ddd" }}>
          <Row>
            {chunk.map((movie) => (
              <Col key={movie._id} md={4} lg={3} style={{ marginTop: 20 }}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </Container>
      ))}
    </>
  );
};
