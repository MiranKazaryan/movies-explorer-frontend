import React, { useState } from "react";
import "./MoviesCard.css";

function MoviesCard({
  movie,
  savedMovies,
  handleSaveMovie,
  handleDeleteMovie,
}) {
  const isSavedMoviesPage = window.location.pathname === "/saved-movies";
  const savedMovie = savedMovies.find((i) => i.movieId === movie.id);
  const [click, setClick] = useState(false);

  function handleCardClick() {
    setClick(!click);
    if(click === true){
      if (savedMovie) {
        handleDeleteMovie(savedMovie);
        setClick(false);
      } else {
        handleSaveMovie({
          nameRU: movie.nameRU || movie.nameEN,
          image: `https://api.nomoreparties.co${movie.image.url}`,
          trailerLink: movie.trailerLink,
          duration: movie.duration,
          country: movie.country || "null",
          director: movie.director || "null",
          year: movie.year,
          description: movie.description,
          thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
          movieId: movie.id,
          nameEN: movie.nameEN || "null",
        });
        setClick(false);
      }
    }
    
  }

  function timeCalculate(minute) {
    let hour = Math.floor(minute / 60);
    let min = minute % 60;

    if (hour === 0) {
      return `${min} мин`;
    }

    return `${hour}ч ${min}мин`;
  }

  const handleDeleteMovieFromSaved = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    handleDeleteMovie(movie);
  };

  return (
    <section className="movies__card">
      <div className="movies__heading">
        <h3 className="movies__name">{movie.nameRU}</h3>
        <p className="movies__duration">{timeCalculate(movie.duration)}</p>
      </div>
      <a
        href={movie.trailerLink !== undefined ? movie.trailerLink : "*"}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies__preview"
          src={`${
            !isSavedMoviesPage
              ? `https://api.nomoreparties.co${movie.image.url}`
              : movie.image
          }`}
          alt={movie.nameRU}
        />
      </a>
      <>
        {isSavedMoviesPage ? (
          <button
            className="movies__save movies__delete"
            type="button"
            aria-label="Удалить"
            onClick={handleDeleteMovieFromSaved}
          ></button>
        ) : (
          <button
            className={`movies__save ${savedMovie ? "movies__save_active" : ""}`}
            onClick={handleCardClick}
            type="button"
            aria-label="Сохранить"
          >{!savedMovie? 'Сохранить': ''}</button>
        )}
      </>
    </section>
  );
}

export default MoviesCard;
