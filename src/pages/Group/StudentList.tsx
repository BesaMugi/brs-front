import React from "react";
import { Button } from "antd";

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
        <div key={user._id}>
          {user.firstName} {user.lastName}
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
      ))}
    </>
  );
};

export default StudentList;
