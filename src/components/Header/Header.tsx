import styles from "./Header.module.scss"

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <a href="#" className={styles.  logo}><img src="/src/assets/favicon.png" alt="logo" /></a>
        <div className={styles.navbar}>
          <ul className={styles.navbar_menu}>
            <li><a href="#">Главная</a></li>
            <li><a href="#">Предметы</a></li>
            <li><a href="/groups">Группы</a></li>
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