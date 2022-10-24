import "./FilterCheckbox.css";
import { useState } from "react";

function FilterCheckbox({
  checked,
  onChange
  }) {

  return (
    <label className="filtercheckbox">
      <input
        onChange={onChange}
        checked={checked}
        type="checkbox"
        className="invisible-filtercheckbox"
      />
      <span className="visible-filtercheckbox" />
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;
