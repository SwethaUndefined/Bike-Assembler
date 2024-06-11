import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const loginCheck = async (values) => {
  try {
    const res = await instance.post("/login", values);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const logoutUser = async (username) => {
  try {
    const res = await instance.post("/logout", { username });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getAllBikes = async () => {
  try {
    const res = await instance.get("/bike");
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const submitSelectedBikes = async (selectedBikes, username) => {
  try {
    const res = await instance.post("/selected-bike", { selectedBikes, username });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getSelectedBikesByUsername = async (username) => {
  try {
    const res = await instance.get(`/selected-bike/${username}`);
    return res.data;
  } catch (error) {
  }
};
export const updateSelectedBike = async (bikeId, username, bikeStatus) => {
  try {
    const res = await instance.put(`/selected-bike/${username}/${bikeId}`, bikeStatus);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getProductionCountForDay = async (username, date) => {
  try {
    const res = await instance.get(`/production/production-count/${username}/${date}`);
    return res.data;
  } catch (error) {
  }
};

export const fetchDataByDateRange = async (fromDate, toDate) => {
  try {
    const res = await instance.get(`/assembled/assembled-bikes?fromDate=${fromDate}&toDate=${toDate}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};