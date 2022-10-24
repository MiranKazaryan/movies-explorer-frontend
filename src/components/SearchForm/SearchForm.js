import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import { useState } from "react";

function SearchForm({
  onSearch,
  checked,
  onCheckClick,
  initialSearchQueryValues,
  isActiveForUpdate,
}) {
  const [query, setQuery] = useState(initialSearchQueryValues);

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(query);
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
            required
          />
          <button className="searchform__submit" type="submit">
            Найти
          </button>
        </div>
        <FilterCheckbox checked={checked} onChange={onCheckClick} />
      </form>
    </section>
  );
}

export default SearchForm;
