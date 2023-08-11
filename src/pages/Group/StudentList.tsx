import React from "react";
import { Button } from "antd";
import styles from './Group.module.scss'

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  currentGroupId: string;
}

interface StudentListProps {
  students: Student[];
  handleAddUserToGroup: (groupId: string, userId: string) => void;
  handleDeleteUserFromGroup: (groupId: string, userId: string) => void;
  currentGroupId: string;
  isStudentAddedToGroup: (groupId: string, userId: string) => boolean;
}


const StudentList: React.FC<StudentListProps> = ({
  students,
  handleAddUserToGroup,
  handleDeleteUserFromGroup,
  currentGroupId,
  isStudentAddedToGroup,
}) => {
	
  return (
    <>
      {students.map((user) => (
        <div key={user._id} className={styles.student_btn}>
          {user.firstName} {user.lastName}
          <div>

          <Button
            onClick={() => handleAddUserToGroup(currentGroupId, user._id)}
            disabled={isStudentAddedToGroup(currentGroupId, user._id)}
				>
            +
          </Button>
          <Button
            onClick={() => handleDeleteUserFromGroup(currentGroupId, user._id)}
            >
            Х
          </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default StudentList;
