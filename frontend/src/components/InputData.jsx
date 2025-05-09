import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const InputData = ({ onClose, task, onSuccess }) => {
  const [Data, setData] = useState({ title: "", desc: "" });

  useEffect(() => {
    if (task) setData({ title: task.title, desc: task.desc });
  }, [task]);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const submitData = async (e) => {
    e.preventDefault();
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
      return;
    }

    try {
      if (task) {
        // UPDATE
        await axios.put(`http://localhost:8080/api/v2/update-tasks/${task._id}`, Data, { headers });
        alert("Task updated successfully");
      } else {
        // CREATE
        await axios.post("http://localhost:8080/api/v2/create-task", Data, { headers });
        alert("Task created successfully");
      }
      setData({ title: "", desc: "" });
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error submitting task:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800 opacity-60"></div>
      <div className="relative bg-gray-500 p-10 rounded-xl shadow-lg w-full max-w-3xl text-white z-10">
        <button onClick={onClose} className="absolute top-2 right-3 text-white text-2xl font-bold hover:text-red-500">×</button>
        <form className="space-y-4" onSubmit={submitData}>
          <input
            name='title'
            type="text"
            placeholder="Title"
            className="w-full bg-gray-800/80 border border-gray-700 rounded-md px-3 py-4 text-white placeholder-gray-400"
            value={Data.title}
            onChange={change}
          />
          <textarea
            name='desc'
            rows="6"
            placeholder="Description.."
            className="w-full bg-gray-800/80 border border-gray-700 rounded-md px-3 py-4 text-white placeholder-gray-400"
            value={Data.desc}
            onChange={change}
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md w-full">
            {task ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
