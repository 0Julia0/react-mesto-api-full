import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const registerData = {
    password: '',
    email: ''
  }
  const [data, setData] = React.useState(registerData)

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(data => ({
          ...data,
          [name]: value,
        }))
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        onRegister(data)
    }

    return (
      <form className="start-page" name="form" onSubmit={handleSubmit}>
        <h2 className="start-page__title">Регистрация</h2>
        <input
          className="start-page__input"
          value={data.email}
          onChange={handleChange}
          name="email"
          placeholder="Email"
          type="email"
        />
        <input
          className="start-page__input"
          value={data.password}
          onChange={handleChange}
          name="password"
          placeholder="Пароль"
          type="password"
        />
        <button className="start-page__button" type="submit">
          Зарегистрироваться
        </button>
        <Link className="start-page__link" to="/signin">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    );
}

export default Register;