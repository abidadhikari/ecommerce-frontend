import React from "react";
import { BASE_URL, BASE_URL_BASE } from "../../helper/urlConfig";
import { ButtonPrimary, GoogleBtn } from "../utils/Buttons";

function ContinueWithGoogle() {
  const googleAuth = () => {
    window.open(`${BASE_URL_BASE}/auth/google/callback`, "_self");
  };
  return (
    <GoogleBtn text="Continue with Google" type="button" onClick={googleAuth} />
  );
}

export default ContinueWithGoogle;
