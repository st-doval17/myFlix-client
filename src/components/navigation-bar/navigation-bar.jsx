import React, { useState } from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import "./navigation-bar.scss";
import { useLocation } from "react-router-dom";

export const NavigationBar = ({
  user,
  onLoggedOut,
  movies,
  setFilteredMovies,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const location = useLocation();

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : movies.filter(
          (movie) =>
            movie.Title.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const filteredMovies = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filteredMovies);
    setSearchQuery("");
  };

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleSuggestionSelected = (event, { suggestionValue }) => {
    setSearchQuery(suggestionValue);
  };

  const renderSuggestion = (suggestion) => <div>{suggestion.Title}</div>;

  const inputProps = {
    placeholder: "Search Title",
    value: searchQuery,
    onChange: (_, { newValue }) => setSearchQuery(newValue),
  };

  const handleHomeClick = () => {
    setFilteredMovies([]);
    setSearchQuery("");
  };

  return (
    <Navbar className="navbar navbar-dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleHomeClick}>
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/" onClick={handleHomeClick}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          {user && !location.pathname.includes("/profile") && (
            <div className="ms-auto">
              <Form onSubmit={handleSearchSubmit} className="search-form">
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                  onSuggestionsClearRequested={handleSuggestionsClearRequested}
                  getSuggestionValue={(suggestion) => suggestion.Title}
                  renderSuggestion={renderSuggestion}
                  onSuggestionSelected={handleSuggestionSelected}
                  inputProps={inputProps}
                />
                <Button variant="outline-light" size="sm" type="submit">
                  Search
                </Button>
              </Form>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
