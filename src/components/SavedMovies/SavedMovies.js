import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

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
      <SearchForm />
      { isLoading && <Preloader /> }
      { !isLoading && <MoviesCardList /> }    
    </>    
  );
}

export default SavedMovies;