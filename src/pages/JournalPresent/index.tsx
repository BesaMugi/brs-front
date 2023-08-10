  import styles from "./Journal.module.scss";
  import Header from "../../components/Header";
  import React, { useEffect } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import { userAll, updateUser } from "../../reducer/userSlice"; 
  import { RootState, AppDispatch } from "../../store/store"; 
  import { User } from "../../components/AllUsers";
  import uuid from "react-uuid"

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

    const handlePresentToggle = (
      userId: string,
      entryDate: string,
      presentDate: string
    ) => {
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          const updatedUser = { ...user };
          const entryIndex = updatedUser.journalPresent.findIndex(
            (entry) => entry.date === entryDate
          );
          if (entryIndex !== -1) {
            const presentIndex = updatedUser.journalPresent[entryIndex].presents.findIndex(
              (pres) => pres.date === presentDate
            );
            if (presentIndex !== -1) {
              updatedUser.journalPresent[entryIndex].presents[presentIndex].present = !updatedUser.journalPresent[entryIndex].presents[presentIndex].present;
            }
          }
          return updatedUser;
        }
        return user;
      });
      dispatch(updateUser(updatedUsers));
    };
    
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
                    .map((item) => (
                      <th key={item.date}>{item.date.substring(0, 10)}</th>
                    ))
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
                        <td
                          key={user._id }
                          className={styles.cell}
                          onClick={() =>
                            handlePresentToggle(user._id, entry.date, item.date)
                          }
                        >
                          {item.present ? "н" : ""}
                        </td>
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
