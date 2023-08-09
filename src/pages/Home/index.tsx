import Header from "../../components/Header";
import AllUsers from "../../components/AllUsers";
import SignUp from "../../pages/SignUp/signUp";
import styles from './Home.module.scss'

function Home() {
  return (
    <>
      <Header />
      <div className={styles.home_main}>
        <div>
          <SignUp />
        </div>
        <div>
          <AllUsers />
        </div>
      </div>
    </>
  );
}

export default Home;
