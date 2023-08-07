import styles from "./Journal.module.scss";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Brs = () => {
  return (
    <>
      <Header />

      <div style={{ width: "70%", margin: "0 auto" }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ФИО студентов</th>
              <th>1 аттестация</th>
              <th>2 аттестация</th>
              <th>Премиальные баллы</th>
              <th>Посещение</th>
              <th>Итого</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Хадисов АбдулБек</td>
              <td>85</td>
              <td>90</td>
              <td>5</td>
              <td>4</td>
              <td>180</td>
            </tr>
            <tr>
              <td>Петров Петр</td>
              <td>75</td>
              <td>80</td>
              <td>0</td>
              <td>11</td>
              <td>155</td>
            </tr>
            <tr>
              <td>Идигов Беслан</td>
              <td>92</td>
              <td>88</td>
              <td>10</td>
              <td>7</td>
              <td>190</td>
            </tr>
            <tr>
              <td>Минтуев Магомед</td>
              <td>80</td>
              <td>85</td>
              <td>8</td>
              <td>6</td>
              <td>173</td>
            </tr>
            <tr>
              <td>Павел Дуров</td>
              <td>78</td>
              <td>82</td>
              <td>2</td>
              <td>15</td>
              <td>162</td>
            </tr>
            <tr>
              <td>Адам Исраилров</td>
              <td>88</td>
              <td>92</td>
              <td>5</td>
              <td>20</td>
              <td>185</td>
            </tr>
            <tr>
              <td>Смирнов Сергей</td>
              <td>70</td>
              <td>78</td>
              <td>3</td>
              <td>12</td>
              <td>151</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Brs;
