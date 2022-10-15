import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Header></Header>
      <SearchForm />
      {isLoading && <Preloader />}
      {!isLoading && <MoviesCardList />}
      <Footer></Footer>
    </>
  );
}

export default SavedMovies;
