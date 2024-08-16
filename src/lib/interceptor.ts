import { redirect } from "@tanstack/react-router";
import axios from "axios";

const secureAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

secureAxios.interceptors.request.use(
  (request) => {
    const sessionID = localStorage.getItem("sessionID");
    if (sessionID) {
      request.headers["authorization"] = `Bearer ${sessionID}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

secureAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403)
    ) {
      localStorage.removeItem("sessionID");
      localStorage.removeItem("auth.user");
      throw redirect({ to: "/login" });
    }
    return Promise.reject(error);
  },
);

export default secureAxios;
