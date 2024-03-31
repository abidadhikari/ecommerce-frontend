import axios from "axios";
import { BASE_URL_BASE } from "../../helper/urlConfig";
import { clearUser } from "../../Store/Features/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import store from "../../Store/store";

const Logout = async () => {
  try {
    const response = await axios.get(`${BASE_URL_BASE}/auth/logout`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      localStorage.removeItem("user");
      localStorage.clear();
      store.dispatch(clearUser());
    }

    console.log("LOGOUT::::", response.data);
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default Logout;
