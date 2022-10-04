import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path={"/"} element={Main}></Route>
        <Route path={"/movies"} element={Movies}></Route>
        <Route path={"/saved-movies"} element={SavedMovies}></Route>
        <Route path={"/profile"} element={Profile}></Route>
        <Route path={"/signin"} element={Login}></Route>
        <Route path={"signup"} element={Register}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
