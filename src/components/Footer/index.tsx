import styles from "./Footer.module.scss";
import { InstagramOutlined, YoutubeOutlined } from "@ant-design/icons";

function Footer() {
  return (
    <footer>
      <div className={styles.container}>
        <img src="/src/assets/favicon.png" alt="logo" />
        <div className={styles.address}>
          <span>
            364024, Россия, Чеченская Республика, Грозный, пр. Эсамбаева, 21(8712)22-65-57
          </span>
        </div>
        <div className={styles.contacts}>
          <a href="https://www.instagram.com/riu_grozny/">
            <InstagramOutlined />
          </a>
          <a href="https://www.youtube.com/channel/UC_jbVbxe04Y6adJKDQgzMDA">
            <YoutubeOutlined />
          </a>
        </div>
        <div className={styles.copyright}>
        <span>
          © Copyright 2021 РОССИЙСКИЙ ИСЛАМСКИЙ УНИВЕРСИТЕТ Им. КУНТА ХАДЖИ
        </span>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
