import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./SignIn.module.scss";

function SignIn() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const error = useSelector((state) => {
    return state.application.error;
  });

  // createSlice - 3 cases
    // handleSignIn / dispatch(auth({log, pass}))

  return (
    <div className={styles.form_auth_block}>
      <div className={styles.form_auth_block_content}>
        <h1>Авторизация</h1>
        <form className={styles.form_auth_style}>
          <input type="name" name="auth_login" placeholder="Введите логин..." />
          <input
            type="password"
            name="auth_pass"
            placeholder="Введите пароль..."
          />
          <button
            className={styles.form_auth_button}
            type="submit"
            name="form_auth_submit"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
