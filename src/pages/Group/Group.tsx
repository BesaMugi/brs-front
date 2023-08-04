import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createGroups,
  deleteGroups,
  fetchGroups,
  updateGroupsInStore,
} from "../../reducer/groupSlice";
import { AppDispatch, RootState } from "store/store";
import styles from "./Group.module.scss";

interface Group {
  _id: string;
  name: string;
  users: any[];
  lessons: any[];
}

const Group = () => {
  const groups = useSelector((state: RootState) => state.groups.groups);

  const dispatch = useDispatch<AppDispatch>();

  const [groupName, setGroupName] = useState<string>("");
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingGroupName, setEditingGroupName] = useState<string>("");

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

  useEffect(() => {
    dispatch(fetchGroups());
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
                    <div
                      className={styles.btn_check_mark}
                      onClick={() => handleEditGroup(item._id)}
                    >
                      ✓
                    </div>
                  ) : (
                    <div
                      className={styles.btn_redaction_mark}
                      onClick={() => handleStartEditing(item._id, item.name)}
                    >
                      ✏️
                    </div>
                  )}
                  <div className={styles.end_name}>
                    {isEditing ? (
                      <input
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
                  <span
                    onClick={() => handleDeleteGroup(item._id)}
                    className={styles.delete_group}
                  >
                    X
                  </span>
                </div>
                <div className={styles.main_lesson_user}>
                  <div>
                    <button>Предметы</button>
                  </div>
                  <div>
                    <button>Студенты</button>
                  </div>
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
