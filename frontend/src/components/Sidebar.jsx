import React, { useState, useEffect } from 'react'
import { FaTasks } from "react-icons/fa";
import { MdIncompleteCircle } from "react-icons/md";
import { IoIosCloudDone } from "react-icons/io";
import { MdLabelImportant } from "react-icons/md";
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import axios from 'axios';
export const Sidebar = () => {
    const data = [
        {
            title:"All Tasks",
            icon : <FaTasks />,
            link : "/",
        },
        {
            title:"ImportantTasks",
            icon : <MdLabelImportant />,
            link : "/importantTasks",
        },
        {
            title:"Complete Tasks",
            icon : <IoIosCloudDone />,
            link : "/completeTasks",
        },
        {
            title:"Incomplete Tasks",
            icon : <MdIncompleteCircle />,
            link : "/incompleteTasks",
        },
    ];
    const dispatch = useDispatch();
    const history = useNavigate();
    const  [Data, setData] = useState();
    const logout = () =>{
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
        history("/login");
    }
   const headers = {
    id : localStorage.getItem("id"),
    authorization:`Bearer $(localStorage.getItem("token"))` ,
   }
   useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v2/get-all-tasks", {
          headers,
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);
   
  return (
  <>
       
       {Data && (
         <div >
         <h2 className='text-xl font-semibold'>{Data.username}</h2>
         <h4 className='my-1 text-gray-400'>{Data.email}</h4>
         <hr />
     </div>

       )}
        <div >
            {data.map((items, i) =>(
                <Link to={items.link} key={i}
                 className="my-5 flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors duration-200 hover:bg-gray-800 hover:text-blue-400">
                {items.icon} {items.title}
              </Link>
              
            ))}
        </div>

        <div>
            <button onClick={logout}
        className='bg-gray-600 w-full p-2 rounded-2xl cursor-pointer' >Logout</button></div>
        </>
  )
}
