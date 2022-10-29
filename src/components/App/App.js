import "./App.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import NotFound from "../NotFound/NotFound";
import UserContext from "../../context/UserContext";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import {
  errorText,
  errorTextConflict,
  errorLogin,
} from "../../utils/constants";
import ProtectedRoutes from "../ProtectedRoute/ProtectedRoutes";
import InfoToolTip from "../InfoToolTip/InfoToolTip";

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") || false
  );
  const [currentUser, setCurrentUser] = useState({});
  const [status, setStatus] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isActiveForUpdate, setIsActiveForUpdate] = useState(true);
  const [formError, setFormError] = useState("");

  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    mainApi
      .getUser()
      .then((res) => {
        setCurrentUser(res);
        setLoggedIn(true);
        localStorage.setItem("loggedIn", "true");
      })
      .catch((err) => {
        setLoggedIn(false);
        handleLogout();
        setCurrentUser({});
        setSavedMovies([]);
        setAllMovies([]);
      });
  }

  //Подгружаем все фильмы в localStorage
  function getMovies() {
    tokenCheck();
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((movies) => {
        setAllMovies(movies);
        localStorage.setItem("allmovies", JSON.stringify(movies));
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setStatus(false);
        setIsInfoTooltipOpen(true);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //Подгружаем сохраненные фильмы
  function getSavedMovies() {
    tokenCheck();
    setIsLoading(true);
    mainApi
      .getMovies()
      .then((movies) => {
        const moviesToShow = movies.filter(
          (movie) => movie.owner === currentUser._id
        );
        setSavedMovies(moviesToShow);
        setIsLoading(false);
        localStorage.setItem("saved-movies", JSON.stringify(moviesToShow));
      })
      .catch((err) => {
        setErrorMessage(errorText);
        setStatus(false);
        setIsInfoTooltipOpen(true);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      getSavedMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  //Сохранение фильмов
  function handleSaveMovie(movie) {
    tokenCheck();
    mainApi
      .saveMovie(movie)
      .then((movie) => {
        setSavedMovies([movie, ...savedMovies]);
        localStorage.setItem("saved-movies", JSON.stringify(movie));
      })
      .catch((err) => {
        setErrorMessage(errorText);
        setStatus(false);
        setIsInfoTooltipOpen(true);
      });
  }

  //Удаление фильмов из сохраненных
  function handleDeleteMovie(movie) {
    tokenCheck();
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== movie._id));
        localStorage.setItem("saved-movies", JSON.stringify(savedMovies));
      })
      .catch((err) => {
        setErrorMessage(errorText);
        setStatus(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleRegisterSubmit(name, email, password) {
    setIsActiveForUpdate(false);
    return mainApi
      .registration(name, email, password)
      .then(() => {
        handleLoginSubmit(email, password);
        setIsActiveForUpdate(true);
      })
      .catch((err) => {
        setIsActiveForUpdate(true);
        if (err === "Ошибка: 409") {
          return setFormError(errorTextConflict);
        }
        setFormError(errorText);
      });
  }

  function handleLoginSubmit(email, password) {
    setIsActiveForUpdate(false);
    mainApi
      .authorization(email, password)
      .then((res) => {
        localStorage.setItem("jwt", JSON.stringify(res.token));
        tokenCheck();
        setFormError("");
        setIsActiveForUpdate(true);
      })
      .catch((err) => {
        setIsActiveForUpdate(true);
        setFormError(errorLogin);
      });
  }

  function handleUpdateProfile(name, email) {
    tokenCheck();
    setIsActiveForUpdate(false);
    mainApi
      .editProfile(name, email)
      .then((res) => {
        setCurrentUser(res);
        setStatus(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        setStatus(false);
        setIsInfoTooltipOpen(true);
      });
  }

  const onProfileEdit = () => {
    setIsActiveForUpdate(true);
  };

  function handleLogout() {
    navigate("/");
    setLoggedIn(false);
    setCurrentUser({});
    setSavedMovies([]);
    setAllMovies([]);
    setIsActiveForUpdate(true);
    localStorage.clear();
  }

  function handleClose() {
    setIsInfoTooltipOpen(false);
  }

  function handleOverlayClose(e) {
    if (e.target.classList.contains("popup")) {
      handleClose();
    }
  }

  return (
    <div className="App">
      <UserContext.Provider value={currentUser}>
        <div className="App">
          <Routes>
            <Route
              path="/signin"
              element={
                loggedIn ? (
                  <Navigate to="/movies" />
                ) : (
                  <Login
                    handleLoginSubmit={handleLoginSubmit}
                    formError={formError}
                    isActiveForUpdate={isActiveForUpdate}
                  />
                )
              }
            ></Route>

            <Route
              path="/signup"
              element={
                loggedIn ? (
                  <Navigate to="/movies" />
                ) : (
                  <Register
                    handleRegisterSubmit={handleRegisterSubmit}
                    formError={formError}
                    isActiveForUpdate={isActiveForUpdate}
                  />
                )
              }
            ></Route>

            <Route
              exact
              path="/"
              element={
                <>
                  <Header loggedIn={loggedIn} />
                  <Main />
                  <Footer />
                </>
              }
            ></Route>
            <Route element={<ProtectedRoutes loggedIn={loggedIn} />}>
              <Route
                path="/movies"
                element={
                  <>
                    <Header loggedIn={loggedIn} />
                    <Movies
                      allMovies={allMovies}
                      setAllMovies={setAllMovies}
                      savedMovies={savedMovies}
                      handleSaveMovie={handleSaveMovie}
                      handleDeleteMovie={handleDeleteMovie}
                      getMovies={getMovies}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      isActiveForUpdate={isActiveForUpdate}
                      setIsActiveForUpdate={setIsActiveForUpdate}
                    />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/saved-movies"
                loggedIn={loggedIn}
                element={
                  <>
                    <Header loggedIn={loggedIn} />
                    <SavedMovies
                      savedMovies={savedMovies}
                      getSavedMovies={getSavedMovies}
                      handleDeleteMovie={handleDeleteMovie}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      isActiveForUpdate={isActiveForUpdate}
                      setIsActiveForUpdate={setIsActiveForUpdate}
                    />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/profile"
                loggedIn={loggedIn}
                element={
                  <>
                    <Header loggedIn={loggedIn} />
                    <Profile
                      handleProfileUpdate={handleUpdateProfile}
                      onLogout={handleLogout}
                      handleEdit={onProfileEdit}
                      isActiveForUpdate={isActiveForUpdate}
                      setIsActiveForUpdate={setIsActiveForUpdate}
                    />
                  </>
                }
              />
            </Route>

            <Route exact path="*" element={<NotFound />}></Route>
          </Routes>

          <InfoToolTip
            status={status}
            isOpen={isInfoTooltipOpen}
            closePopup={handleClose}
            handleOverlayClose={handleOverlayClose}
            errorMessage={errorMessage}
          />
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
