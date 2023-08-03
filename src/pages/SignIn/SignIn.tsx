import styles from "./SignIn.module.scss";

function SignIn() {
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
