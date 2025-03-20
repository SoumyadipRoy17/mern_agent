import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaPhone, FaStickyNote } from "react-icons/fa";

const TasksByAgent = () => {
  const [tasksByAgent, setTasksByAgent] = useState([]);

  useEffect(() => {
    const fetchTasksByAgent = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:1000/api/lists/tasks-by-agent"
        );
        setTasksByAgent(data);
      } catch (error) {
        alert("Error fetching tasks by agent");
      }
    };

    fetchTasksByAgent();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 p-6">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-lg p-8 w-full max-w-4xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center ">
          Tasks Assigned to Agents
        </h2>
        {tasksByAgent.length > 0 ? (
          tasksByAgent.map((agentTasks, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-semibold mb-4  flex items-center gap-2">
                <FaUser className="text-yellow-400" /> Agent: {agentTasks.agent}
              </h3>
              <ul className="space-y-4">
                {agentTasks.tasks.map((task, taskIndex) => (
                  <li
                    key={taskIndex}
                    className="bg-white bg-opacity-30 p-4 rounded-lg shadow-md transition duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <p className=" flex items-center gap-2">
                      <FaUser className="text-blue-300" />{" "}
                      <span className="font-medium">Name:</span>{" "}
                      {task.firstName}
                    </p>
                    <p className=" flex items-center gap-2">
                      <FaPhone className="text-green-400" />{" "}
                      <span className="font-medium">Phone:</span> {task.phone}
                    </p>
                    <p className=" flex items-center gap-2">
                      <FaStickyNote className="text-yellow-300" />{" "}
                      <span className="font-medium">Notes:</span> {task.notes}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-center  text-lg">No tasks assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default TasksByAgent;
