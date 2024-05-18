import React from "react";
import LandingLayout from "../layouts/LandingLayouts";
import BreadCrumb from "../components/BreadCrumb";

function Errorpage() {
  return (
    <LandingLayout>
      <div className="container">
        <BreadCrumb
          ghostLink={[{ name: "Home", link: "/" }]}
          activeLink={{ name: "404 Error", link: "#" }}
        />
      </div>
      <div className="flex justify-center flex-col items-center">
        <div className="text-8xl font-semibold pb-10">404 Not Found</div>
        <div className="text-sm pb-20">
          Your visited page not found. You may got to home page.
        </div>
        <div className="pb-28">
          <button className="border rounded bg-red-600 text-white py-4 px-12">
            Back to home page
          </button>
        </div>
      </div>
    </LandingLayout>
  );
}

export default Errorpage;
