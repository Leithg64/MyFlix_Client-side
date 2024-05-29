import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

import "./movie-view.scss"

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

    return (
      <div className="movie-close">
        <div>
          <span className="title-elm">Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span className="title-elm">Genre: </span>
          <span>{movie.genre}</span>
        </div>
        <div>
          <span className="title-elm">Description: </span>
          <span>{movie.description}</span>
        </div>
        <div className="movie-poster">
          <img src={movie.image}/>
        </div>
        <div>
          <span className="title-elm">Director: </span>
          <span>{movie.director}</span>
        </div>
        <div>
          <span className="title-elm">Actors: </span>
          <span>{movie.actors}</span>
        </div>
        <Link to={`/`}>
          <Button className="back-button">Back</Button>
          <br />
        </Link>
        
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
