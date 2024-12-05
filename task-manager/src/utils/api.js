import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Backend server URL

export const fetchTasksApi = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/tasks`, {
    headers: { Authorization: token },
  });
  return response;
};

export const addTaskApi = async (task, token) => {
  const response = await axios.post(
    `${API_BASE_URL}/tasks`,
    { task },
    {
      headers: { Authorization: token },
    }
  );
  return response; // Return the response object for further use
};

export const deleteTaskApi = async (index, token) => {
  const response = await axios.delete(`${API_BASE_URL}/tasks/${index}`, {
    headers: { Authorization: token },
  });
  return response;
};