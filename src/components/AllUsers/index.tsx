import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAll, deleteUser, updateUser } from "../../reducer/userSlice";
import { RootState, AppDispatch } from "store/store";
import { UserData } from "../../reducer/userSlice";
import EditUserModal from "./EditUserModal";

export interface User {
  _id: string;
  login: string;
  firstName: string;
  lastName: string;
  surName: string;
  role: string;
  password: string;
  groups: string;
  lessons: string;
}

const useUserSelector = (selector: (state: RootState) => any) =>
  useSelector<RootState, ReturnType<typeof selector>>(selector);

const useAppDispatch = () => useDispatch<AppDispatch>();

const AllUsers: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useUserSelector((state) => state.users.users) as User[];
  const loading = useUserSelector((state) => state.users.loading);
  const error = useUserSelector((state) => state.users.error);

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
    <div>
      <h2>Пользователи</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.firstName} {user.lastName} {user.surName} {user.groups}
            {user.role === "user" && (
              <>
                <button onClick={() => handleDeleteUser(user._id)}>X</button>
                <button onClick={() => handleUpdateUser(user)}>+</button>
              </>
            )}
          </li>
        ))}
      </ul>
      {showModal && selectedUser && (
        <EditUserModal user={selectedUser} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default AllUsers;
