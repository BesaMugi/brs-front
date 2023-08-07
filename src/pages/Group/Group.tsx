import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLessonInGroup,
  createGroups,
  deleteGroups,
  deleteLessonFromGroup,
  fetchGroups,
  updateGroupsInStore,
} from "../../reducer/groupSlice";
import { AppDispatch, RootState } from "store/store";
import styles from "./Group.module.scss";
import { Link } from "react-router-dom";
import { fetchLessons } from "../../reducer/lessonSlice";
import { Button, Input, Modal } from "antd";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import SearchLessons from "./Search/SearchLessons";

export interface Group {
  _id: string;
  name: string;
  users: any[];
  lessons: any[];
}

const Group = () => {
  const groups = useSelector((state: RootState) => state.groups.groups);
  const lessons = useSelector((state: RootState) => state.lessons.lessons);

  const dispatch = useDispatch<AppDispatch>();

  const [groupName, setGroupName] = useState<string>("");

  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingGroupName, setEditingGroupName] = useState<string>("");
  
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const [editedGroupLessons, setEditedGroupLessons] = useState<any[]>([]);
    // Новое состояние для хранения предметов текущей редактируемой группы

  const [currentGroupId, setCurrentGroupId] = useState<string | null>(null);
    // Новое состояние для отслеживания ID текущей группы

    const handleOpenModal = (groupId: string) => {
      setCurrentGroupId(groupId); // Установить ID текущей группы
      const group = groups.find((group) => group._id === groupId);
      if (group) {
        // setEditedGroupLessons(group.lessons); // Загрузить предметы текущей группы
        setShowModal(true);
      }
    };
  
    const handleCloseModal = () => {
      setCurrentGroupId(null); // Сбросить ID текущей группы при закрытии модального окна
      setShowModal(false);
    };

  const handleAddLessonToGroup = (groupId: string, lessonId: string) => {
    dispatch(addLessonInGroup({ groupId, lessonId }));
  };

  const handleDeleteLessonFromGroup = (groupId: string, lessonId: string) => {
    dispatch(deleteLessonFromGroup({ groupId, lessonId }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleAddGroup = () => {
    if (groupName.trim() === "") {
      return;
    }
    dispatch(createGroups(groupName));
    setGroupName("");
  };

  const handleEditGroup = (groupId: string) => {
    if (editingGroupName.trim() !== "") {
      dispatch(
        updateGroupsInStore({ groupId, updatedGroupName: editingGroupName })
      );
    }
    setEditingGroupId(null);
  };

  const handleStartEditing = (groupId: string, groupName: string) => {
    setEditingGroupId(groupId);
    setEditingGroupName(groupName);
  };

  const handleDeleteGroup = (groupId: string) => {
    dispatch(deleteGroups(groupId));
  };

  const handleSearch = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  useEffect(() => {
    const filteredLessons = lessons.filter((lesson) =>
      lesson.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setEditedGroupLessons(filteredLessons);
  }, [searchValue, lessons]);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchLessons());
  }, []);

  return (
    <>
      <div className={styles.input_group}>
        <div className={styles.left}>
          <div className={styles.input_group}>
            <input
              placeholder="Создать группу..."
              value={groupName}
              type="text"
              onChange={handleInputChange}
            />
            <button className={styles.btn_add_group} onClick={handleAddGroup}>
              Создать группу
            </button>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {groups.map((item) => {
          const isEditing = editingGroupId === item._id;

          return (
            <div className={styles.card} key={item._id}>
              <div>
                <div className={styles.edit_name}>
                  {isEditing ? (
                    <Button
                      icon={<CheckOutlined />}
                      className={styles.btn_check_mark}
                      onClick={() => handleEditGroup(item._id)}
                    />
                  ) : (
                    <Button
                      icon={<EditOutlined />}
                      className={styles.btn_redaction_mark}
                      onClick={() => handleStartEditing(item._id, item.name)}
                    />
                  )}
                  <div className={styles.end_name}>
                    {isEditing ? (
                      <Input
                        className={styles.edit_input}
                        type="text"
                        value={editingGroupName}
                        onChange={(e) => {
                          setEditingGroupName(e.target.value);
                        }}
                      />
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </div>
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteGroup(item._id)}
                    className={styles.delete_group}
                  />
                </div>
                <div className={styles.main_lesson_user}>
                  <div>
                    <Button className={styles.group_students}>
                      {" "}
                      <Link to={"/users"}>Студенты</Link>
                    </Button>
                  </div>
                  <div>
                    <Button onClick={() => handleOpenModal(item._id)}>Предметы</Button>
                  </div>
                  {showModal && currentGroupId === item._id && ( // Отображение модального окна только для текущей группы
                    <Modal
                      title="Добавление предмета"
                      open={true}
                      onOk={handleCloseModal}
                      onCancel={handleCloseModal}
                      maskStyle={{ backgroundColor: " #00000020" }}
                    >
                      <SearchLessons handleSearch={handleSearch} />
                      <div>
                        {editedGroupLessons.map((lesson) => {
                          return (
                            <div key={lesson._id}>
                              {lesson.title}
                              <button
                                onClick={() =>
                                  handleAddLessonToGroup(item._id, lesson._id)
                                }
                              >
                                +
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteLessonFromGroup(
                                    item._id,
                                    lesson._id
                                  )
                                }
                              >
                                x
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </Modal>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Group;
