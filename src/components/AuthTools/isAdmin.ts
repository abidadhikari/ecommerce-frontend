import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";

const IsAdmin = () => {
  const auth = useSelector((state: RootState) => state.authSlice);

  try {
    let localUser = localStorage.getItem("user");
    localUser = JSON.parse(localUser!).role;

    if (auth.user.role === "ADMIN" || localUser === "ADMIN") {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export default IsAdmin;
