import React from "react";

function Login({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(evt){
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleLoginSubmit(evt) {
    evt.preventDefault();
    onLogin({ email, password });
  }

    return (
      <form className="start-page" name="form" onSubmit={handleLoginSubmit}>
        <h2 className="start-page__title">Вход</h2>
        <input
          className="start-page__input"
          value={email}
          onChange={handleChangeEmail}
          name="email"
          placeholder="Email"
          type="email"
        />
        <input
          className="start-page__input"
          value={password}
          onChange={handleChangePassword}
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