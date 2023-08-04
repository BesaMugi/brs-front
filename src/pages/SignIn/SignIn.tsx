import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SignIn.module.scss";
import { authSignIn } from "../../reducer/authSlices";
import { AppDispatch, RootState } from "store/store";

function SignIn() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const error = useSelector((state: RootState) => {
    return state.application.error;
  });

  const token = useSelector((state: RootState) => {
    return state.application.token;
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authSignIn({ login, password }));
    if (token) {
      navigate("/");
    }
  };

  const hadleSetLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };
  const handleSetPassword = (e: ChangeEvent<HTMLInputElement>) => {
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
            <button className={styles.form_auth_button} type="submit">
              <Link to={'/home'} >
              Войти 
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
