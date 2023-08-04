import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAll, deleteUser } from "../../reducer/userSlice";
import { RootState, AppDispatch } from "store/store";

interface User {
  id: string;
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

  useEffect(() => {
    dispatch(userAll());
  }, [dispatch]);

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUser(userId));
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
          <li key={user.id}>
            {user.firstName} {user.lastName} {user.surName}
            {user.role === "user" && (
              <button onClick={() => handleDeleteUser(user._id)}>X</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsers;
