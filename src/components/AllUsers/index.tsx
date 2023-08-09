import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAll, deleteUser, updateUser } from "../../reducer/userSlice";
import { RootState, AppDispatch } from "store/store";
import { UserData } from "../../reducer/userSlice";
import EditUserModal from "./UserModal/EditUserModal";
import styles from "./AllUsers.module.scss";
import { Group } from "../../reducer/groupSlice";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export interface User {
  _id: string;
  login: string;
  firstName: string;
  lastName: string;
  surName: string;
  role: string;
  password: string;
  groups: string[];
  lessons: string[];
}

const useUserSelector = (selector: (state: RootState) => any) =>
  useSelector<RootState, ReturnType<typeof selector>>(selector);

const useAppDispatch = () => useDispatch<AppDispatch>();

const AllUsers: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useUserSelector(
    (state: RootState) => state.users.users
  ) as User[];
  const groups = useSelector(
    (state: RootState) => state.groups.groups
  ) as Group[];
  const loading = useUserSelector((state: RootState) => state.users.loading);
  const error = useUserSelector((state: RootState) => state.users.error);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  useEffect(() => {
    dispatch(userAll());
  }, [dispatch]);

  const handleDeleteUser = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  const handleUpdateUser = (user: UserData) => {
    dispatch(updateUser(user));
    setSelectedUser(user);
    setShowModal(true);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.usersTable}>
      <h1>Список студентов</h1>
      <table>
        <thead>
          <tr>
            <th>Изменить</th>
            <th>Имя</th>
            <th>Фамилие</th>
            <th>Отчество</th>
            <th>Группа</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {user.role === "user" && (
                  <Button type="danger"
                  icon={<EditOutlined />} onClick={() => handleUpdateUser(user)}></Button>
                )}
              </td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.surName}</td>
              <td>
                {user.groups.map((groupId) => {
                  const group = groups.find((group) => group._id === groupId);
                  return group ? group.name : "Неизвестная группа";
                })}
              </td>
              <td>
                {user.role === "user" && (
                  <Button type="danger"
                  icon={<DeleteOutlined />} onClick={() => handleDeleteUser(user._id)}></Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default AllUsers;
