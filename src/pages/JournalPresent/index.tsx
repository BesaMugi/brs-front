import styles from "./Journal.module.scss";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Journal = () => {
  return (
    <>
      <Header />

      <div style={{ width: "70%", margin: "0 auto" }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ФИО студентов</th>
              <th>07.02.2023</th>
              <th>07.02.2023</th>
              <th>07.02.2023</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Хадисов АбдулБек</td>
              <td>н</td>
              <td> </td>
              <td>н</td>
            </tr>
            <tr>
              <td>Петров Петр</td>
              <td>н</td>
              <td>н</td>
              <td> </td>
            </tr>
            <tr>
              <td>Идигов Беслан</td>
              <td>н</td>
              <td>н</td>
              <td> </td>
            </tr>
            <tr>
              <td>Минтуев Магомед</td>
              <td>н</td>
              <td>н</td>
              <td> </td>
            </tr>
            <tr>
              <td>Павел Дуров</td>
              <td> </td>
              <td>н</td>
              <td>н</td>
            </tr>
            <tr>
              <td>Адам Исраилров</td>
              <td>н</td>
              <td> </td>
              <td>н</td>
            </tr>
            <tr>
              <td>Смирнов Сергей</td>
              <td>н</td>
              <td> </td>
              <td>н</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Journal;
