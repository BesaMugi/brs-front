import { Input } from 'antd';
import React, { useState } from 'react';

const SearchLessons = ({ handleSearch }: any) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    handleSearch(value);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Поиск уроков..."
        value={searchValue}
        onChange={handleChangeInput}
      />
    </div>
  );
};

export default SearchLessons;
