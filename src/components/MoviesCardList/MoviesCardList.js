import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  savedMovies,
  isMoreButton,
  handleMoreButtonClick,
  handleSaveMovie,
  handleDeleteMovie,
  resultText,
  notFound,
}) {
  return (
    <section className={`movies${savedMovies ? " saved-movies" : ""}`}>
      {!notFound ? (
        <>
          <div className="movies__card-list">
            {movies.map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie.id || movie._id}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
                savedMovies={savedMovies}
              />
            ))}
          </div>

          {isMoreButton ? (
            <div className="movies__more">
              {" "}
              <button
                className="movies__more-button"
                onClick={handleMoreButtonClick}
              >
                Ёще
              </button>
            </div>
          ) : (
            <div className="more-button_disable"></div>
          )}
        </>
      ) : (
        <div className="movies__card-list">
          <p className="not-found">{resultText}</p>
        </div>
      )}
    </section>
  );
}

export default MoviesCardList;
