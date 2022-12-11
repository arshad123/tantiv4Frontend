import axios from "axios";
const UNAUTHORIZED = 401;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { status } = error.response;
    if (status === UNAUTHORIZED) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

const api = async (action) => {
  const { url, method, data, params } = action;
  const headers = {
    Authorization: process.env.REACT_APP_APIKEY,
  };

  if (localStorage.getItem("token")) {
    headers["jwt"] = localStorage.getItem("token");
  }
  try {
    const response = await axios.request({
      baseURL: process.env.REACT_APP_APIURL,
      headers,
      url,
      method,
      params,
      data,
    });
    // General
    return response;
  } catch (error) {
    return error.response;
  }
};

export default api;
