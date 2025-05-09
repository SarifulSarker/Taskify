import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import axios from 'axios';

export const ImportantTasks = () => {
  const [importantTasks, setImportantTasks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchImportantTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v2/get-important-tasks", {
          headers,
        });
        setImportantTasks(response.data.data);
      } catch (error) {
        console.error("Error fetching important tasks:", error);
      }
    };

    fetchImportantTasks();
  }, []);

  return (
    <div className='my-12'>
      <Cards data={importantTasks} />
    </div>
  );
};
