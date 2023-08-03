import React, { useEffect } from "react";
import { fetchLessons } from "../../reducer/lessonSlice";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./Lessons.module.scss";

const Lessons: React.FC = () => {
  const lessons = useSelector((state) => state.lessons.lessons);
  console.log(lessons);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  return (
    <main>
        <Header />
        <div className={styles.content}>
          {lessons.map((item) => (
            <div key={item._id} className={styles.lessonItem}>
              <div className={styles.lessonTitle}>{item.title}</div>
            </div>
          ))}
        </div>
      <Footer />
    </main>
  );
};

export default Lessons;
