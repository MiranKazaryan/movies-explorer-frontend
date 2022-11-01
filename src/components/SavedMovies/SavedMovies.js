import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { shortMovieDuration } from "../../utils/constants";

function SavedMovies({
  savedMovies,
  getSavedMovies,
  handleDeleteMovie,
  isLoading,
  setIsLoading,
  isActiveForUpdate,
  setIsActiveForUpdate,
  isClick,
  setIsClick,
}) {
  const [shortMovies, setShortMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [filteredShortMovies, setFilteredShortMovies] = React.useState([]);
  const [isShort, setIsShort] = React.useState(false);
  const [moviesToRender, setMoviesToRender] = React.useState([]);
  const [savedMoviesQuery, setSavedMoviesQuery] = React.useState("");
  const [notFound, setNotFound] = React.useState(false);
  const [isValid, setIsValid] = React.useState(true);
  const resultText =
    localStorage.getItem("query") === "null" ? "" : "Ничего не найдено";
  const [click, setClick] = React.useState(false);
  function handleSearch(query) {
    setIsLoading(true);
    setIsActiveForUpdate(false);
    setFilteredShortMovies([]);
    setFilteredMovies([]);
    let filterSavedMovies = savedMovies;
    if (query !== "" && query !== null) {
      filterSavedMovies = savedMovies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFilteredShortMovies(
      filterSavedMovies.filter((movie) => movie.duration <= shortMovieDuration)
    );
    setFilteredMovies(filterSavedMovies);
    setSavedMoviesQuery(query);
    setIsActiveForUpdate(true);
  }

  function handleShortClick() {
    setIsShort(!isShort);
  }

  function getRenderMovies(savedMovies) {
    if (savedMovies.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
    setMoviesToRender(savedMovies);
  }

  function renderMovies() {
    setIsLoading(true);
    if (isShort && filteredShortMovies.length !== 0) {
      if (click) {
        getRenderMovies(moviesToRender);
      } else {
        getRenderMovies(filteredShortMovies);
      }
    }
    if (isShort && filteredShortMovies.length === 0) {
      if (savedMoviesQuery !== "") {
        getRenderMovies([]);
        setNotFound(true);
      } else {
        getRenderMovies(shortMovies);
      }
    }
    if (!isShort && filteredMovies.length !== 0) {
      if (click) {
        getRenderMovies(moviesToRender);
      } else {
        getRenderMovies(filteredMovies);
      }
    }
    if (!isShort && filteredMovies.length === 0) {
      if (savedMoviesQuery !== "") {
        getRenderMovies([]);
        setNotFound(true);
      } else {
        getRenderMovies(savedMovies);
      }
    }
    setIsLoading(false);
  }

  function handleClick(savedMovies) {
    setClick(true);

    setIsLoading(true);
    handleDeleteMovie(savedMovies);
    const movSav = moviesToRender.filter((movie) => {
      return savedMovies._id !== movie._id;
    });
    setMoviesToRender(movSav);
    setIsLoading(false);
  }

  React.useEffect(() => {
    setIsLoading(true);
    setShortMovies(
      savedMovies.filter((movie) => movie.duration <= shortMovieDuration)
    );
    renderMovies();
    setIsLoading(false);
    console.log(moviesToRender);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isShort,
    filteredMovies,
    filteredShortMovies,
    moviesToRender,
    savedMovies,
  ]);
  function validQuery(query) {
    if (query === "" || query === "null") {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }
  return (
    <section>
      <SearchForm
        onSearch={handleSearch}
        checked={isShort}
        onCheckClick={handleShortClick}
        isActiveForUpdate={isActiveForUpdate}
        validQuery={validQuery}
        isValid={isValid}
      />{" "}
      {isLoading ? (
        <Preloader isOpen={isLoading} />
      ) : (
        <MoviesCardList
          movies={moviesToRender}
          isLoading={isLoading}
          handleDeleteMovie={handleClick}
          savedMovies={savedMovies}
          resultText={resultText}
          notFound={notFound}
          click={isClick}
          setClick={setIsClick}
        />
      )}
    </section>
  );
}

export default SavedMovies;
