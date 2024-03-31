import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";

const IsAuthenticated = () => {
  const auth = useSelector((state: RootState) => state.authSlice);

  try {
    let localUser = localStorage.getItem("user");
    localUser = JSON.parse(localUser!).token;
    if (!auth.user) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export default IsAuthenticated;
