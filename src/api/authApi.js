import axios from "axios";

export const loginUser = async (data) => {
  const response = await axios.post(
    "https://dummyjson.com/user/login",
    data
  );

  return response.data;
};