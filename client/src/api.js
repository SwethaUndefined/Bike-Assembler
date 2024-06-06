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

export const getAllBikes = async () => {
  try {
    const res = await instance.get("/bike");
    return res.data;
  } catch (error) {
    console.error("LoginCheck::error", error);
    throw error;
  }
};
export const getBikeById = async (bike_id) => {
  console.log(bike_id,"bike_id")
  try {
    const res = await instance.get(`/bike/${bike_id}`);
    return res.data;
  } catch (error) {
    console.error("GetBikeById::error", error);
    throw error;
  }
};

export const assembleBike = async (bikeId) => {
  try {
    const response = await instance.post(`/assembly`, { bikeId });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateEmployeeProduction = async (employeeId, bikesAssembled) => {
  try {
    const response = await instance.post(`/employeeProduction`, { employeeId, bikesAssembled });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
