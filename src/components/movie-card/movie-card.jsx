import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Button } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired
};