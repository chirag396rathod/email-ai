// lib/axiosInstance.ts
import axios from "axios";
import { getToken, getUserId } from "./constants";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    id: getUserId() || undefined,
  },
  withCredentials: true, // if you're using cookies or auth
});
const token = getToken();
if (token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axiosInstance;
