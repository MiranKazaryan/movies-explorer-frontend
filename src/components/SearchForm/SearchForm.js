import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import { useState } from "react";

function SearchForm({
  onSearch,
  checked,
  onCheckClick,
  initialSearchQueryValues,
  isActiveForUpdate,
  validQuery,
  isValid,
  setIsValid,
}) {
  const [query, setQuery] = useState(initialSearchQueryValues || null);

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (query) {
      setIsValid(true);
      validQuery(query);
      onSearch(query);
    } else {
      setIsValid(false);
    }
  }

  return (
    <section className="search">
      <form className="searchform" onSubmit={handleSubmit} noValidate>
        <div className="searchform__container">
          <input
            type="text"
            id="input-search"
            name="search-field"
            className="searchform__item"
            placeholder="Фильм"
            onChange={handleQueryChange}
            disabled={!isActiveForUpdate}
            value={query}
            required
          />
          <button className="searchform__submit" type="submit">
            Найти
          </button>
        </div>
        <span
          className={
            !isValid ? "search__input-error" : "search__input-error_hidden"
          }
        >
          Нужно ввести ключевое слово
        </span>
        <FilterCheckbox checked={checked} onChange={onCheckClick} />
      </form>
    </section>
  );
}

export default SearchForm;
