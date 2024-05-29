import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from '../profile-view/profile-view';
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col } from "react-bootstrap/";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflixparttwo-bcd374c2380d.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          image: movie.ImagePath,
          title: movie.Title,
          genre: movie.Genre.Name,
          description: movie.Description,
          director: movie.Director.Name,
          actors: movie.Actors,
        }));

        localStorage.setItem("movies", JSON.stringify(moviesFromApi));
        setMovies(moviesFromApi);
        setFilteredMovies(moviesFromApi); // Initialize filteredMovies with all movies
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  const handleSearch = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredMovies(movies); // Reset to full movie list
    } else {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };

  const handleFavoriteToggle = (movieId) => {
    const isFavorite = user.FavoriteMovies.includes(movieId);
    const method = isFavorite ? "delete" : "post";
    const url = `https://myflixparttwo-bcd374c2380d.herokuapp.com/users/${user.Username}/movies/${movieId}`;

    axios({
      method: method,
      url: url,
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      const updatedUser = { ...user, FavoriteMovies: response.data.FavoriteMovies };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    })
    .catch((error) => {
      console.error("Error updating favorites:", error);
    });
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        onSearch={handleSearch} // Pass handleSearch to NavigationBar
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {user ? (
                  <ProfileView
                    token={token}
                    movies={movies}
                    user={user}
                    setUser={setUser}
                  />
                ) : (
                  <Navigate to="/login" />
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => {
                      setUser(user);
                      setToken(localStorage.getItem("token"));
                    }} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={5}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : filteredMovies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {filteredMovies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard
                          movie={movie}
                          isFavorite={user.FavoriteMovies.includes(movie.id)}
                          onFavoriteToggle={() => handleFavoriteToggle(movie.id)}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
