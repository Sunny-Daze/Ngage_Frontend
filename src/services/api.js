import axios from "axios";

const URL = "http://localhost:9000";

export const userRegister = async (userData) => {
  try {
    return await axios.post(`${URL}/register`, userData)
    .then(res => {
      return res.data;
    })
  } catch (e) {
    console.log("Error in registering the user ", e);
  }
};

export const loginUser = async (userData) => {
  try {
    return await axios.post(`${URL}/login`, userData)
    .then(res => {
      return res.data;
    })
  } catch (e) {
    console.log("Error in logging in the user ", e);
  }
};
