
import React, { useEffect } from "react";
import styles from "./Group.module.scss";
import { Button } from "antd";

interface LessonListProps {
  lessons: any[];
  handleAddLessonToGroup: (groupId: string, lessonId: string) => void;
  handleDeleteLessonFromGroup: (groupId: string, lessonId: string) => void;
  isLessonAddedToGroup: (groupId: string, lessonId: string) => boolean;
  currentGroupId: string;
}

const LessonList: React.FC<LessonListProps> = ({
  lessons,
  handleAddLessonToGroup,
  handleDeleteLessonFromGroup,
  isLessonAddedToGroup,
  currentGroupId,
}) => {
  return (
    <div>
      {lessons.map((lesson) => (
        <div key={lesson._id}>
          {lesson.title}
          <Button
            onClick={() => handleAddLessonToGroup(currentGroupId, lesson._id)}
            disabled={isLessonAddedToGroup(currentGroupId, lesson._id)}
          >
            +
          </Button>
          <Button
            onClick={() => handleDeleteLessonFromGroup(currentGroupId, lesson._id)}
            className={
              isLessonAddedToGroup(currentGroupId, lesson._id)
                ? `${styles.delete_active}`
                : ""
            }
          >
            x
          </Button>
        </div>
      ))}
    </div>
  );
};

export default LessonList;