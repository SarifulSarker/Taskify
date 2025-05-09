import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import axios from 'axios';

export const CompleteTasks = () => {
  const [completeTasks, setcompleteTasks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v2/get-all-tasks", {
          headers,
        });

        // DEBUG: Check full structure
        console.log("Full API response:", response.data);

        // Access tasks safely and filter for incomplete tasks
        const tasks = response.data?.data?.tasks || [];
        const filtered = tasks.filter(task => task.complete === true);
        setcompleteTasks(filtered);

      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className='my-12'>
      <Cards data={completeTasks} />
    </div>
  );
};
