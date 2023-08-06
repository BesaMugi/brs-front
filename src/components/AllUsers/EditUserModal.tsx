import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser, UserData } from "../../reducer/userSlice";

interface EditUserModalProps {
  user: UserData;
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [surName, setSurName] = useState(user.surName);
  const [group, setGroup] = useState(user.group);

  const handleSave = () => {
    const updatedUser: UserData = {
      ...user,
      firstName,
      lastName,
      surName,
      group,
    };
    dispatch(updateUser(updatedUser));
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit User</h2>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          SurName:
          <input type="text" value={surName} onChange={(e) => setSurName(e.target.value)} />
        </label>
        <label>
          Group:
          <input type="text" value={group} onChange={(e) => setGroup(e.target.value)} />
        </label>
        <button onClick={handleSave}>Сохранить</button>
        <button onClick={handleCancel}>Отменить</button>
      </div>
    </div>
  );
};

export default EditUserModal;
