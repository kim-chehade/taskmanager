import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";

const Home = () => {
  const state = useLocation().state;
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState(state?.description || "");
  const [status] = useState(state?.status || "Pending");

  const statusMappings = {
    "Pending": 1,
    "In Progress": 2,
    "Done": 3,
  };

  const formatDate = (date) => {
    return moment(date).format('DD-MM-YYYY');
  };

  const onSubmit = async (e) => {
    try {
      const response = await axios.post(`../tasks`, {
        description: value,
        date: moment(new Date()).format('YYYY-MM-DD'),
        status_id: statusMappings[status],
      });
    
      if (response.status === 200) {
        fetchTasks();
        setValue("");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }    

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`../tasks`);
      // Format the date in the response data before setting it
      const formattedTasks = res.data.map(task => ({
        ...task,
        date: formatDate(task.date),
      }));
      setTasks(formattedTasks);
    } catch (err) {
      console.log("Axios Error:", err);
      console.log("Response Data:", err.response.data);
    }
  };

  const handleChangeStatus = async (taskId, currentStatus) => {
    try {
      let newStatusId = statusMappings[currentStatus];
      newStatusId = (newStatusId % 3) + 1;

      const response = await axios.put(`../tasks/${taskId}`, {
        status_id: newStatusId,
      });

      if (response.status === 200) {
        fetchTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`../tasks/`);
        // Format the date in the response data before setting it
        const formattedTasks = res.data.map(task => ({
          ...task,
          date: formatDate(task.date),
        }));
        setTasks(formattedTasks);
      } catch (err) {
        console.log("Axios Error:", err);
        console.log("Response Data:", err.response.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th colSpan={5}>Insert Your Tasks</th>
          </tr>
          <tr>
            <th colSpan={4}>
              <input
                type="text"
                placeholder="Enter new task...."
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </th>
            <th>
              <button onClick={onSubmit}>Create</button>
            </th>
          </tr>
          <tr>
            <th>Task#</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.description}</td>
              <td>{task.date}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => handleChangeStatus(task.id, task.status)}>
                  Next
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
