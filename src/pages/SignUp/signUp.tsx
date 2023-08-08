import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { authSignUp } from "../../reducer/authSlices";
import { userAll } from "../../reducer/userSlice";
import styles from "./SignUp.module.scss";

const SignUp = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [surName, setSurName] = useState("");
  const dispatch = useDispatch();

  const error = useSelector((state) => state.application.error);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        authSignUp({ login, password, firstName, lastName, surName })
      );
      setFirstName("");
      setLastName("");
      setSurName("");
      setLogin("");
      setPassword("");
      dispatch(userAll());
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
    }
  };

  useEffect(() => {
    dispatch(userAll());
  }, []);

  return (
    <div className={styles.container}>
      <h1>Создать аккаунт</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="Имя"
          />
        </div>
        <div>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Фамилия"
          />
        </div>
        <div>
          <input
            type="text"
            value={surName}
            onChange={(e) => setSurName(e.target.value)}
            required
            placeholder="Отчество"
          />
        </div>
        <div>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            placeholder="Логин"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Пароль"
          />
        </div>
        <div>
          <button type="submit">Создать</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
