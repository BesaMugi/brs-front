import React, { useEffect, useState } from "react";
import {
  addLessons,
  changeLessons,
  deleteLessons,
  fetchLessons,
} from "../../reducer/lessonSlice";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "./Lessons.module.scss";
import { Button, Input, Modal } from "antd";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AppDispatch, RootState } from "store/store";

const Lessons: React.FC = () => {
  const lessons = useSelector((state: RootState) => state.lessons.lessons);
  const [showModal, setShowModal] = useState(false);
  const [lessonName, setLessonName] = useState("");
  const [changeLessonId, setChangeLesson] = useState<string | null>(null);
  const [newLessonName, setNewLessonName] = useState("");

  const dispatch = useDispatch<AppDispatch>();

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

  const handleDeleteLesson = (lessonId: string) => {
    dispatch(deleteLessons(lessonId));
  };

  const handleChangeLesson = (lessonId, newLessonName) => {
    if (newLessonName.trim() === "") {
      return;
    }
    dispatch(changeLessons({ lessonId, newLessonName }));
    setNewLessonName("");
  };

  useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  return (
    <main>
      <Header />
      <div className={styles.content}>
        <Button type="danger" className={styles.button_add} onClick={handleOpenModal}>Добавить урок</Button>
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

        {lessons.map((item) => {
          let isEdit = item._id === changeLessonId;
          return (
            <div key={item._id} className={styles.lessonItem}>
              {isEdit ? (
                <Input
                  style={{ width: 100 }}
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
                      setChangeLesson(null);
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
      </div>
      <Footer />
    </main>
  );
};

export default Lessons;
