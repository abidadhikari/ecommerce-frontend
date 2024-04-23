import axios from "axios";
import { BASE_URL_BASE } from "../../helper/urlConfig";
import { clearUser } from "../../Store/Features/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import store from "../../Store/store";
import { useNavigate } from "react-router-dom";
import { clearCartLocal } from "../../Store/Features/Cart/CartSlice";

const Logout = async () => {
  try {
    document.cookie = "";
    const response = await axios.get(`${BASE_URL_BASE}/auth/logout`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      // Clear local storage
      localStorage.removeItem("user");
      localStorage.clear();

      store.dispatch(clearUser());
      store.dispatch(clearCartLocal());
    }
    console.log("LOGOUT::::", response.data);
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default Logout;
