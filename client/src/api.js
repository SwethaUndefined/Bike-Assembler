import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const loginCheck = async (values) => {
  try {
    const res = await instance.post("/login", values);
    return res.data;
  } catch (error) {
    console.error("LoginCheck::error", error);
    throw error;
  }
};
export const logoutUser = async (username) => {
  try {
    const res = await instance.post("/logout", { username });
    return res.data;
  } catch (error) {
    console.error("Logout::error", error);
    throw error;
  }
};
export const getAllBikes = async () => {
  try {
    const res = await instance.get("/bike");
    return res.data;
  } catch (error) {
    console.error("LoginCheck::error", error);
    throw error;
  }
};

