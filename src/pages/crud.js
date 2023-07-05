import axios from "axios";

const BASE_URL = "https://dummyjson.com/users";

export const getUsers = () => {
  return axios.get(BASE_URL);
};

export const deleteUser = (userId) => {
  return axios.delete(`${BASE_URL}/${userId}`);
};

export const getUser = (userId) => {
  return axios.get(`${BASE_URL}/${userId}`);
};

export const updateUser = (userId, updatedData) => {
  return axios.put(`${BASE_URL}/${userId}`, updatedData);
};

export const addUser = (newUserData) => {
  return axios.post(`${BASE_URL}/add`, newUserData);
};
