import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaHeart, FaEdit, FaTrash } from "react-icons/fa";

const Cards = ({ data , onEdit }) => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    setTaskList(data || []);
  }, [data]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  //handle important task
  const handleImportantTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v2/updateImportant-task/${id}`,
        {},
        { headers }
      );
  
      // Toggle important status locally
      const updatedList = taskList.map((task) =>
        task._id === id ? { ...task, important: !task.important } : task
      );
      setTaskList(updatedList);
    } catch (error) {
      console.error("Error updating importance:", error);
    }
  };


  //handle compelte taask
  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v2/updateComplete-tasks/${id}`,
        {},
        { headers }
      );

      // Toggle complete status locally
      const updatedList = taskList.map((task) =>
        task._id === id ? { ...task, complete: !task.complete } : task
      );
      setTaskList(updatedList);
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };

  // handleDeleteTask
  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v2/delete-tasks/${id}`,
        { headers }
      );
  
   //   alert(response.data.message);
  
      // Remove the deleted task from the taskList state
      const updatedList = taskList.filter((task) => task._id !== id);
      setTaskList(updatedList);
  
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  

  if (!Array.isArray(taskList) || taskList.length === 0) {
    return <p className="text-white text-center mt-6">No tasks to show.</p>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
        {taskList.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white rounded-xl p-4 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-300 mb-4">{item.desc}</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <button
                className={`${
                  item.complete
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-400 hover:bg-red-600"
                } text-white px-4 py-1 rounded-md text-sm`}
                onClick={() => handleCompleteTask(item._id)}
              >
                {item.complete ? "Complete" : "Incomplete"}
              </button>

              <div className="flex items-center gap-3 text-gray-300">
              <FaHeart
                  className={`cursor-pointer transition-colors duration-200 ${
                    item.important ? "text-red-500" : "text-gray-300 hover:text-red-500"
                  }`}
                 onClick={() => handleImportantTask(item._id)}
             />

{onEdit && (
  <FaEdit
    onClick={() => onEdit(item)}
    className="hover:text-yellow-500 cursor-pointer"
  />
)}

             
                <FaTrash 
                onClick={() => handleDeleteTask(item._id)}
                className="hover:text-red-600 cursor-pointer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
