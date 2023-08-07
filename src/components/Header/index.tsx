import { Link } from "react-router-dom"
import styles from "./Header.module.scss"

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <Link to={'/home'} className={styles.logo}><img src="/src/assets/favicon.png" alt="logo" /></Link>
        <div className={styles.navbar}>
          <ul className={styles.navbar_menu}>
            <li><Link to={'/home'}>Главная</Link></li>
            <li><Link to={'/lessons'}>Предметы</Link></li>
            <li><Link to={'/groups'}>Группы</Link></li>
            <li><a href="#">Образование</a></li>
            <li><a href="#">Контакты</a></li>
          </ul>
        </div>
        <a href="#">User_name</a>
      </div>
    </header>
  )
}

export default Header