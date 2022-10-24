import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import useFormWithValidation from "../../hooks/useValidationForm";

function Profile({
  currentUser,
  handleProfileUpdate,
  onLogout,
  handleEdit,
  isActiveForUpdate,
  setIsActiveForUpdate,
}) {
  const { values, handleChange, errors, isValid, resetForm, updateValue } =
    useFormWithValidation();

  React.useEffect(() => {
    setIsActiveForUpdate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    updateValue("name", currentUser.name);
    updateValue("email", currentUser.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const isButtonDisabled =
    !isValid ||
    (values.name === currentUser.name && values.email === currentUser.email);

  const handleEditProfile = (e) => {
    e.preventDefault();
    handleEdit();
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleProfileUpdate(values.name, values.email);
    resetForm();
  }

  return (
    <section className="profile">
      <h1 className="profile__heading">Привет, {currentUser.name}!</h1>
      <form className="profile__form" onSubmit={handleSubmit} noValidate>
        <div className="profile__form-container">
          <fieldset className="profile__form-fields">
            <label className="profile__form-label">
              Имя{" "}
              <input
                className="profile__form-input"
                type="text"
                name="name"
                minLength="2"
                maxLength="50"
                required
                disabled={!isActiveForUpdate}
                value={values.name || ""}
                onChange={handleChange}
              />
            </label>

            <span className="profile__input-error">{errors.name}</span>
            <label className="profile__form-label">
              E-mail{" "}
              <input
                className="profile__form-input"
                type="email"
                name="email"
                minLength="2"
                maxLength="254"
                required
                disabled={!isActiveForUpdate}
                value={values.email || ""}
                onChange={handleChange}
              />
            </label>

            <span className="profile__form-input-error">{errors.email}</span>
          </fieldset>
        </div>

        {!isActiveForUpdate ? (
          <button
            className="profile__form-button profile__account-edit"
            onClick={handleEditProfile}
          >
            Редактировать
          </button>
        ) : (
          <button
            type="submit"
            disabled={isButtonDisabled}
            className="profile__form-save-button"
          >
            Сохранить
          </button>
        )}
      </form>
      {!isActiveForUpdate && (
        <Link
          to="/signin"
          className="profile__form-button profile__account-exit"
          onClick={onLogout}
        >
          Выйти из аккаунта
        </Link>
      )}
    </section>
  );
}

export default Profile;
