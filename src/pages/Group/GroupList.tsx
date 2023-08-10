import styles from "./Group.module.scss";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { useEffect } from "react";
import { userAll } from "../../reducer/userSlice";
import { Link, useParams } from "react-router-dom";
import { Button } from "antd";

const GroupList = () => {
  const { id } = useParams();
  const groups = useSelector((state: RootState) => state.groups.groups);
  const group = groups.find((item) => item._id === id);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(userAll());
  }, []);

  return (
    <>
      <Header />
      <Button>
        <Link to={"/groups"}>Назад</Link>
      </Button>
      <div>
        <div className={styles.groupTable}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>№</th>
                <th>ФИО студентов</th>
              </tr>
            </thead>
            <tbody>
              {group.users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    {user.firstName} {user.lastName} {user.surName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>№</th>
                <th>Название предметов</th>
              </tr>
            </thead>
            <tbody>
              {group.lessons.map((lesson, index) => (
                <tr key={lesson._id}>
                  <td>{index + 1}</td>
                  <td>{lesson.title}</td>
                  <td>
                    <button>
                      <Link to={`/groups/${group._id}/subjects/${lesson._id}`}>
                        Журнал
                      </Link>   
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default GroupList;
