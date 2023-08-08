import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styles from "./sugnUp.module.scss";
import {  authSignUp } from "../../reducer/authSlices";
import { userAll } from "../../reducer/userSlice";

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
      await dispatch(authSignUp({ login, password, firstName, lastName, surName }));
      dispatch(userAll()); 
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
    }
  };

  
  useEffect(() => {
    dispatch(userAll());
  }, []);

  return (
    <div>
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
            placeholder="Фамилиe"
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
