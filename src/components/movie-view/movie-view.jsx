import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";

import "./movie-view.scss"

export const MovieView = ({ movie, onBackClick }) => {
  console.log("movie", movie);
    return (
      <div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <img src={movie.image} />
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
        </div>
        <div>
          <span>Actors: </span>
          <span>{movie.actors}</span>
        </div>
        <button 
        onClick={onBackClick}
        className="back-button"
        style={{ cursor: "pointer" }}
        >
          Back
        </button>
      </div>
    );
};
  
MovieView.proptypes = {
  movie: PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
      actors: PropTypes.string,
      director: PropTypes.shape({
          name:PropTypes.string,
          bio: PropTypes.string,
          birth: PropTypes.string,
          death: PropTypes.string
      }).isRequired,
      description: PropTypes.string,
      genre: PropTypes.string,
  }).isRequired
};   
