import { Link } from "react-router-dom"
import styles from "./Header.module.scss"
import { useSelector } from "react-redux";
import { RootState } from "store/store";

function Header() {

  const handleLogout = () => {
    localStorage.removeItem("token"); // Удаляем токен из localStorage
  };

  return (
    <header>
      <div className={styles.container}>
        <Link to={'/'} className={styles.logo}><img src="/src/assets/favicon.png" alt="logo" /></Link>
        <div className={styles.navbar}>
          <ul className={styles.navbar_menu}>
            <li><Link to={'/'}>БРС</Link></li>
            <li><Link to={'/lessons'}>Предметы</Link></li>
            <li><Link to={'/groups'}>Группы</Link></li>
            <li><Link to={'/users'}>Создать аккаунт</Link></li>
            <li><Link to={'/journal'}>Журнал</Link></li>
          </ul>
        </div>

          <a className={styles.exit} onClick={handleLogout} href="/login">Выйти</a>
      </div>
    </header>
  )
}

export default Header