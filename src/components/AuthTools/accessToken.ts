import axios from "axios";

export const setAccessToken = () => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
};

export const hasAccessToken = () => {
  if (localStorage.getItem("access_token")) {
    return true;
  }
  return false;
};
