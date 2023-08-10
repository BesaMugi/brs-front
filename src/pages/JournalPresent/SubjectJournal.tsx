import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAll, updateUser } from "../../reducer/userSlice";
import { RootState, AppDispatch } from "../../store/store";
import styles from "./Journal.module.scss";
import Header from "../../components/Header";

const useUserSelector = (selector: (state: RootState) => any) =>
  useSelector<RootState, ReturnType<typeof selector>>(selector);

const useAppDispatch = () => useDispatch<AppDispatch>();

const SubjectJournal: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useUserSelector(
    (state: RootState) => state.users.users
  ) as User[];
  const loading = useUserSelector((state: RootState) => state.users.loading);
  const error = useUserSelector((state: RootState) => state.users.error);

  const { groupId, subjectId } = useParams();

  useEffect(() => {
    dispatch(userAll());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

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
          const presentIndex = updatedUser.journalPresent[
            entryIndex
          ].presents.findIndex((pres) => pres.date === presentDate);
          if (presentIndex !== -1) {
            updatedUser.journalPresent[entryIndex].presents[
              presentIndex
            ].present =
              !updatedUser.journalPresent[entryIndex].presents[presentIndex]
                .present;
          }
        }
        return updatedUser;
      }
      return user;
    });
    dispatch(updateUser(updatedUsers));
  };

  const filteredUsers = users.filter((user) => 
  user.groups.includes(groupId)) 

  return (
    <>
      <Header />
      <button>
        <Link to={"/groups"}>Назад</Link>
      </button>
      <div style={{ width: "70%", margin: "0 auto" }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ФИО студентов</th>
              {filteredUsers[0]?.journalPresent.map((entry) =>
                entry.presents.map((item) => (
                  <th key={item.date}>{item.date.substring(0, 10)}</th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>
                  {user.firstName} {user.lastName} {user.surName}
                </td>
                {user.journalPresent.map((entry) =>
                  entry.presents.map((item) => (
                    <td
                      key={user._id}
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

export default SubjectJournal;
