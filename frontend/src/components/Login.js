import React from "react";

function Login({ onLogin }) {
  const loginData = {
    password: '',
    email: ''
  }
  const [data, setData] = React.useState(loginData)

    const handleChange = (e) => {
      const { name, value } = e.target
      setData(data => ({
        ...data,
        [name]: value,
      }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!data.email|| !data.password) {
          return
        }
        onLogin(data)
    }

    return (
      <form className="start-page" name="form" onSubmit={handleSubmit}>
        <h2 className="start-page__title">Вход</h2>
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
          Войти
        </button>
      </form>
    );
}

export default Login;