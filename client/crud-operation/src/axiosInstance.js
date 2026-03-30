import axios from "axios";

export const adminBaseURL = axios.create({
  baseURL: "http://localhost:5000",
});


adminBaseURL.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("userAuth");
    const token = JSON.parse(authToken)?.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("auth-req-error", error);
  },
);

adminBaseURL.interceptors.response.use(  
  (response) => response,               
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("userAuth"); 
      window.location.href = "/login";
    }
    return Promise.reject(error);         
  }
);