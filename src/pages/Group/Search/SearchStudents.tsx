import { Input } from "antd";
import React, { useState } from "react";

const SearchStudents = ({ handleSearchUsers }: any) => {
  const [searchValueUsers, setSearchValueUsers] = useState("");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValueUsers(value);
    handleSearchUsers(value);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Поиск студентов..."
        value={searchValueUsers}
        onChange={handleChangeInput}
      />
    </div>
  );
};

export default SearchStudents;
