export const baseUrl = "https://mrnkzrn.hopto.org";
class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  registration(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    }).then((res) => this._checkResponse(res));
  }

  authorization(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => this._checkResponse(res));
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      withCredentials: true,
      credentials: "include",
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }

  editProfile(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    }).then((res) => this._checkResponse(res));
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      credentials: "include",
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }

  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      credentials: "include",
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    }).then((res) => this._checkResponse(res));
  }

  deleteMovie(_id) {
    return fetch(`${this._baseUrl}/movies/${_id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }
}

export const mainApi = new MainApi({
  baseUrl: `${baseUrl}`,
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
  credentials: "include",
});
