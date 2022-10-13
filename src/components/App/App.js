import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  function onLogout() {
    setIsLoggedIn(false);
    navigate("/");
  }
  function onLogin() {
    setIsLoggedIn(true);
    navigate("/movies");
  }
  return (
    <div className="App">
      <Header></Header>
      <UserContext.Provider value = {isLoggedIn}>
        <Routes>
          <Route path={"/"} element={<Main />}></Route>
          <Route path={"/movies"} element={<Movies />}></Route>
          <Route path={"/saved-movies"} element={<SavedMovies />}></Route>
          <Route path={"/profile"} element={<Profile />}></Route>
          <Route path={"/signin"} element={<Login onLogin={onLogin} />}></Route>
          <Route path={"/signup"} element={<Register />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
      <Footer></Footer>
    </div>
  );
}

export default App;
