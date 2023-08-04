import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAll } from "../../reducer/userSlice";
import { RootState, AppDispatch } from "store/store";

interface User {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  surName: string;
  role: string;
  password: string;
  groups: string;
  lessons: string;
}

const AllUsers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector<RootState, User[]>((state) => state.users.users);
  const loading = useSelector<RootState, boolean>((state) => state.users.loading);
  const error = useSelector<RootState, null | string>((state) => state.users.error);

  useEffect(() => {
    dispatch(userAll());
  }, [dispatch]);

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
          <li key={user.id}>{user.firstName} {user.lastName} {user.surName}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsers;
