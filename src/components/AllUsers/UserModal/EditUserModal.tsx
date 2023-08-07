import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser, UserData } from "../../../reducer/userSlice";
import styles from "./EditUserModal.module.scss";

interface EditUserModalProps {
  user: UserData;
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [surName, setSurName] = useState(user.surName);
  const [groups, setGroups] = useState(user.groups);

  const handleSave = () => {
    const updatedUser: UserData = {
      ...user,
      firstName,
      lastName,
      surName,
      groups,
    };
    dispatch(updateUser(updatedUser));
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <h2>Изменение данных пользователя</h2>
        <label>
          <span>Имя:</span>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          <span>Фамилие:</span>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          <span>Отчество:</span>
          <input
            type="text"
            value={surName}
            onChange={(e) => setSurName(e.target.value)}
          />
        </label>
        <label>
          <span>Группа:</span>
          <input
            type="text"
            value={groups}
            onChange={(e) => setGroups(e.target.value)}
          />
        </label>
        <button onClick={handleSave}>Сохранить</button>
        <button onClick={handleCancel}>Отменить</button>
      </div>
    </div>
  );
};

export default EditUserModal;
