import React, { useEffect, useState } from "react";
import {
  addLessons,
  changeLessons,
  deleteLessons,
  fetchLessons,
} from "../../reducer/lessonSlice";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./Lessons.module.scss";
import { Button, Input, Modal } from "antd";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Lessons: React.FC = () => {
  const lessons = useSelector((state) => state.lessons.lessons);
  const [showModal, setShowModal] = useState(false);
  const [lessonName, setLessonName] = useState("");
  const [changeLessonId, setChangeLesson] = useState(null);
  const [newLessonName, setNewLessonName] = useState("");

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setLessonName("");
  };

  const handleAddLesson = () => {
    if (lessonName.trim() === "") {
      return;
    }
    dispatch(addLessons(lessonName));
    handleCloseModal();
    setLessonName("");
  };

  const handleDeleteLesson = (lessonId) => {
    dispatch(deleteLessons(lessonId));
  };

  const handleChangeLesson = (lessonId, newLessonName) => {
    if(lessonName.trim === '') {
      return true
    }
    dispatch(changeLessons({lessonId, newLessonName}));
    setNewLessonName('')
  };

  console.log(changeLessonId);
  

  useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  return (
    <main>
      <Header />
      <div className={styles.content}>
        {lessons.map((item) => {
          const isEdit = item._id === changeLessonId;
          return (
            <div key={item._id} className={styles.lessonItem}>
              {isEdit ? (
                <Input
                  style={{ width: 200 }}
                  placeholder="Название урока"
                  value={newLessonName}
                  onChange={(e) => setNewLessonName(e.target.value)}
                />
              ) : (
                <div className={styles.lessonTitle}>{item.title}</div>
              )}

              <div>
                {isEdit ? (
                  <Button
                    icon={<CheckOutlined />}
                    onClick={() => {
                      handleChangeLesson(item._id, newLessonName);
                    }}
                  />
                ) : (
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                      setChangeLesson(item._id);
                    }}
                  />
                )}
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteLesson(item._id)}
                />
              </div>
            </div>
          );
        })}
        <Button onClick={handleOpenModal}>Добавить урок</Button>
        {showModal && (
          <div>
            <Modal
              title="Добавление урока"
              open={true}
              onOk={handleAddLesson}
              onCancel={handleCloseModal}
            >
              <Input
                placeholder="Название урока"
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
              />
            </Modal>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default Lessons;
