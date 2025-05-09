import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import axios from 'axios';

export const IncompleteTasks = () => {
  const [incompleteTasks, setIncompleteTasks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v2/get-incomplete-tasks", {
          headers,
        });

       
       
        setIncompleteTasks(response.data.data);

      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className='my-12'>
      <Cards data={incompleteTasks} />
    </div>
  );
};
