import Header from "../../components/Header/Header"
import styles from "./Home.module.scss"
import Footer from "../../components/Footer/Footer"

function Home() {
  return (
    <>
    <Header />
    <div className={styles.wrapper}></div>
    <Footer />
    </>
  )
}

export default Home