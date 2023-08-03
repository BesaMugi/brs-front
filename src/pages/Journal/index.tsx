import React, { useState } from "react";
import { Table } from "antd";

interface JournalEntry {
  key: number;
  name: string;
  isChecked: boolean;
}
// примерная реализация 
const initialData = [
  {
    key: 1,
    name: `Абдул`,
    groups: "2555165",
    isChecked: false,
  },
  {
    key: 2,
    name: `Абдул1`,
    groups: "2555165",
    isChecked: true,
  },
  {
    key: 3,
    name: `1Абдул`,
    groups: "2555165",
    isChecked: true,
  },
];

const Journal: React.FC = () => {
  const [journalData, setJournalData] = useState<JournalEntry[]>(initialData);

  const columns = [
    {
      title: "Фио",
      dataIndex: "name",
      width: 5,
    },
    {
      title: "Группа",
      dataIndex: "groups",
      width: 5,
    },
    {
      title: "Понедельник",
      dataIndex: "isChecked",
      width: 5,
      render: (_, record) => (
        <input
          type="checkbox"
          checked={record.isChecked}
          onChange={() => handleCheckboxChange(record.key)}
        />
      ),
    }
  ];

  const handleCheckboxChange = (key: number) => {
    setJournalData((prevData) =>
      prevData.map((entry) =>
        entry.key === key ? { ...entry, isChecked: !entry.isChecked } : entry
      )
    );
  };

  return <Table columns={columns} dataSource={journalData} />;
};

export default Journal;
