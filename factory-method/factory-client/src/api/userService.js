import axios from "axios";

const API_URL = "http://localhost:3000";

const userService = {
  createUser: (userData) => axios.post(`${API_URL}/users`, userData),
  getUsers: () => axios.get(`${API_URL}/users`),
};

export default userService;
