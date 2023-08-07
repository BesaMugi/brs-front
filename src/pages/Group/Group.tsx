import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLessonInGroup,
  addUserInGroup,
  createGroups,
  deleteGroups,
  deleteLessonFromGroup,
  deleteUserFromGroup,
  fetchGroups,
  updateGroupsInStore,
} from "../../reducer/groupSlice";
import { AppDispatch, RootState } from "store/store";
import styles from "./Group.module.scss";
import { fetchLessons } from "../../reducer/lessonSlice";
import { Button, Input, Modal } from "antd";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import SearchLessons from "./Search/SearchLessons";
import SearchStudents from "./Search/SearchStudents";
import { userAll } from "../../reducer/userSlice";

export interface Group {
  _id: string;
  name: string;
  users: any[];
  lessons: any[];
}

const Group = () => {
  const groups = useSelector((state: RootState) => state.groups.groups);
  const lessons = useSelector((state: RootState) => state.lessons.lessons);
  const users = useSelector((state: RootState) => state.users.users)
  console.log(users)

  const dispatch = useDispatch<AppDispatch>();

  const [groupName, setGroupName] = useState<string>("");

  //изменение названия группы
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingGroupName, setEditingGroupName] = useState<string>("");

  //Состояние модального окна и поиск (предметы)
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  // Состояние для модального окна (студенты)
  const [showStudentModal, setShowStudentModal] = useState<boolean>(false); 
  const [searchValueUsers, setSearchValueUsers] = useState<string>("");

  // Состояние для хранения студентов текущей группы
  const [currentGroupStudents, setCurrentGroupStudents] = useState<any[]>([]); 

  //Состояние для хранения предметов текущей редактируемой группы
  const [editedGroupLessons, setEditedGroupLessons] = useState<any[]>([]);

  //Состояние для отслеживания ID текущей группы
  const [currentGroupId, setCurrentGroupId] = useState<string | null>(null);

  const handleOpenModal = (groupId: string) => {
    setCurrentGroupId(groupId); // Установить ID текущей группы
    const group = groups.find((group) => group._id === groupId);
    if (group) {
      // setEditedGroupLessons(group.lessons); //предметы текущей группы
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setCurrentGroupId(null); // Сбросить ID текущей группы при закрытии модального окна
    setShowModal(false);
  };

  const handleOpenStudentModal = (groupId: string) => {
    setCurrentGroupId(groupId);
    const group = groups.find((group) => group._id === groupId);
    if (group) {
      // setCurrentGroupStudents(group.users); //студенты текущей группы
      setShowStudentModal(true);
    }
  };

  const handleCloseStudentModal = () => {
    setCurrentGroupId(null);
    setShowStudentModal(false);
  };

  //добавление и удаление предмета в группу
  const handleAddLessonToGroup = (groupId: string, lessonId: string) => {
    dispatch(addLessonInGroup({ groupId, lessonId }));
  };
  const handleDeleteLessonFromGroup = (groupId: string, lessonId: string) => {
    dispatch(deleteLessonFromGroup({ groupId, lessonId }));
  };

  //добавление и удаление пользователя в группу
  const handleAddUserToGroup = (groupId: string, userId: string) => {
    dispatch(addUserInGroup({ groupId, userId }));
  };
  const handleDeleteUserFromGroup = (groupId: string, userId: string) => {
    dispatch(deleteUserFromGroup({ groupId, userId }));
  };
  
  //создание группы
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

  //изменение группы
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

  //удаление группы
  const handleDeleteGroup = (groupId: string) => {
    dispatch(deleteGroups(groupId));
  };

  //поиск
  const handleSearch = (searchValue: string) => {
    setSearchValue(searchValue);
  };
  const handleSearchUsers = (searchValueUsers: string) => {
    setSearchValueUsers(searchValueUsers);
  };

  useEffect(() => {
    //для поиска предметов
    const filteredLessons = lessons.filter((lesson) =>
      lesson.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setEditedGroupLessons(filteredLessons);
  }, [searchValue, lessons]);

  useEffect(() => {
  //для поиска пользователей
  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchValueUsers.toLowerCase())
  );
  setCurrentGroupStudents(filteredUsers);
}, [searchValueUsers, users]);

useEffect(() => {
  if (!showModal) {
    // Сбросить значение поиска предметов при закрытии модального окна
    setSearchValue("");
  }
}, [showModal]);

useEffect(() => {
  if (!showStudentModal) {
    // Сбросить значение поиска студентов при закрытии модального окна
    setSearchValueUsers("");
  }
}, [showStudentModal]);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchLessons());
    dispatch(userAll())
  }, []);

  return (
    <>
      <div className={styles.input_group}>
        <div className={styles.left}>
          <div className={styles.input_group}>
            <input
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
                  <Button
                      className={styles.group_students}
                      onClick={() => handleOpenStudentModal(item._id)}
                    >
                      Студенты
                    </Button>
                  </div>
                  <div>
                    <Button onClick={() => handleOpenModal(item._id)}>
                      Предметы
                    </Button>
                  </div>
                  {showModal &&
                    currentGroupId === item._id && ( // Отображение модального окна только для текущей группы
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
                                <Button
                                  onClick={() =>
                                    handleAddLessonToGroup(item._id, lesson._id)
                                  }
                                >
                                  +
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleDeleteLessonFromGroup(
                                      item._id,
                                      lesson._id
                                    )
                                  }
                                >
                                  Х
                                </Button>
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
      {showStudentModal  && (
        <Modal
          title="Добавление студентов"
          open={true}
          onOk={handleCloseStudentModal}
          onCancel={handleCloseStudentModal}
          maskStyle={{ backgroundColor: "#00000020" }}
        >
           <SearchStudents handleSearchUsers={handleSearchUsers} />
          {currentGroupStudents.map((user) => (
            <div key={user._id}>
              {user.firstName} {user.lastName}
              <Button onClick={() => handleAddUserToGroup(currentGroupId, user._id)}>
                +
              </Button>
              <Button onClick={() => handleDeleteUserFromGroup(currentGroupId, user._id)}>
                Х
              </Button>
              
            </div>
          ))}
          
        </Modal>
      )}
    </>
  );
};

export default Group;