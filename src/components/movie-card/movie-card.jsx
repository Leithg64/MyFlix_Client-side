import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import "./movie-card.scss"

export const MovieCard = ({ movie, isFavorite, onFavoriteToggle }) => {
  return (
    <div className="whole-card">
      <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Card.Text>{movie.genre}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="primary">Open</Button>
        </Link>
        <br />
        <Button variant="primary" onClick={onFavoriteToggle}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Card.Body>
    </Card>
    </div>
  );
};

MovieCard.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired
};
