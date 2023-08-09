import styles from "./Journal.module.scss";
import Header from "../../components/Header";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAll } from "../../reducer/userSlice";
import { RootState, AppDispatch } from "store/store";
import { User } from "../../components/AllUsers";

const useUserSelector = (selector: (state: RootState) => any) =>
  useSelector<RootState, ReturnType<typeof selector>>(selector);

const useAppDispatch = () => useDispatch<AppDispatch>();

const Journal: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useUserSelector(
    (state: RootState) => state.users.users
  ) as User[];
  const loading = useUserSelector((state: RootState) => state.users.loading);
  const error = useUserSelector((state: RootState) => state.users.error);

  useEffect(() => {
    dispatch(userAll());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return (
    <>
      <Header />
      <div style={{ width: "70%", margin: "0 auto" }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ФИО студентов</th>
              {users[0]?.journalPresent.map((entry) =>
                entry.presents
                  .filter((item) => new Date(item.date) >= sevenDaysAgo)
                  .map((item) => <th key={item.date}>{item.date}</th>)
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {user.firstName} {user.lastName} {user.surName}
                </td>
                {user.journalPresent.map((entry) =>
                  entry.presents
                    .filter((item) => new Date(item.date) >= sevenDaysAgo)
                    .map((item) => (
                      <td key={entry.date}>{item.present ? "н" : ""}</td>
                    ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Journal;
