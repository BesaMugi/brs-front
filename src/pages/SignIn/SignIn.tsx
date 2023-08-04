import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SignIn.module.scss";
import { authSignIn } from "../../slices/authSlices";


function SignIn() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const error = useSelector((state) => {
    return state.application.error;
  });

  const token = useSelector((state) => {
    return state.application.token;
  });
  const dispatch = useDispatch();

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(authSignIn({ login, password }));
    if (token) {
      navigate("/");
    }
  };

  const hadleSetLogin = (e) => {
    setLogin(e.target.value);
  };
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.form_auth_block}>
      <div className={styles.form_auth_block_content}>
        <h1>Авторизация</h1>
        <form onSubmit={handleSignIn} className={styles.form_auth_style}>
          <div>
            <input
              type="text"
              onChange={hadleSetLogin}
              value={login}
              placeholder="Введите логин"
            />
          </div>
          <div>
            <input
              type="password"
              onChange={handleSetPassword}
              value={password}
              placeholder="Введите пароль"
            />
          </div>
          <div>
          <button
            className={styles.form_auth_button}
            type="submit"
          >
            Войти
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
