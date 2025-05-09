import React, { useState, useEffect } from 'react';
import Cards from '../components/Cards';
import { FaPlus } from "react-icons/fa";
import { InputData } from "../components/InputData";
import axios from 'axios';

export const AllTasks = () => {
  const [showForm, setShowForm] = useState(false);
  const [Data, setData] = useState([]);
  const [editTask, setEditTask] = useState(null); // holds task data when editing

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v2/get-all-tasks", { headers });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      {/* Add Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setEditTask(null); // reset edit mode
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md"
        >
          <FaPlus />
          Add Task
        </button>
      </div>

      {/* Cards List */}
      <Cards
        data={Data.tasks}
        onEdit={(task) => {
          setEditTask(task);
          setShowForm(true);
        }}
        onRefresh={fetchTasks}
      />

      {/* Conditional Form Modal */}
      {showForm && (
        <InputData
          onClose={() => setShowForm(false)}
          task={editTask}
          onSuccess={fetchTasks}
        />
      )}
    </div>
  );
};
