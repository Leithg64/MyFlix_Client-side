// src/components/profile-view/profile-view.jsx
import React, { useState, useEffect } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export const ProfileView = ({ token, movies, user, setUser }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [updateUser, setUpdateUser] = useState({
    Username: user.Username,
    Password: "",
    Email: user.Email,
    Birthday: user.Birthday.split("T")[0] // Ensure proper date format
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setFavoriteMovies(
      movies.filter((m) => user.FavoriteMovies.includes(m.id))
    );
  }, [movies, user.FavoriteMovies]);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(
        `https://myflixparttwo-bcd374c2380d.herokuapp.com/users/${user.Username}`,
        updateUser,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setSuccess("Profile updated successfully");
        setUser(response.data);
      })
      .catch((error) => {
        setError("Failed to update profile");
        console.error(error);
      });
  };

  const handleDeregister = () => {
    axios
      .delete(
        `https://myflixparttwo-bcd374c2380d.herokuapp.com/users/${user.Username}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        localStorage.clear();
        setUser(null);
        window.location.href = "/";
      })
      .catch((error) => {
        setError("Failed to deregister");
        console.error(error);
      });
  };

  const handleFavoriteToggle = (movieId) => {
    const isFavorite = user.FavoriteMovies.includes(movieId);
    axios
      .put(
        `https://myflixparttwo-bcd374c2380d.herokuapp.com/users/${user.Username}/movies/${movieId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          data: isFavorite ? { method: "remove" } : { method: "add" },
        }
      )
      .then((response) => {
        const updatedUser = { ...user, FavoriteMovies: response.data.FavoriteMovies };
        setUser(updatedUser);
        setFavoriteMovies(
          movies.filter((m) => updatedUser.FavoriteMovies.includes(m.id))
        );
      })
      .catch((error) => {
        setError("Failed to update favorites");
        console.error(error);
      });
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={8}>
        <Card>
          <Card.Body>
            <Card.Title>Profile</Card.Title>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={updateUser.Username}
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, Username: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={updateUser.Password}
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, Password: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={updateUser.Email}
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, Email: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={updateUser.Birthday}
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, Birthday: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Update Profile
              </Button>
              <Button
                variant="danger"
                onClick={handleDeregister}
                className="mt-3 ml-3"
              >
                Deregister
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <h2 className="mt-4">Favorite Movies</h2>
        <Row>
          {favoriteMovies.map((movie) => (
            <Col className="mb-4" key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                onFavoriteToggle={() => handleFavoriteToggle(movie.id)}
                isFavorite={user.FavoriteMovies.includes(movie.id)}
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};
