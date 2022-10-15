import "./FilterCheckbox.css";
import { useState } from "react";

function FilterCheckbox() {
  const [isChecked, setIsChecked] = useState(true);

  return (
    <label className="filtercheckbox">
      <input
        onChange={() => {
          setIsChecked(!isChecked);
        }}
        type="checkbox"
        className="invisible-filtercheckbox"
      />
      <span className="visible-filtercheckbox" />
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;
