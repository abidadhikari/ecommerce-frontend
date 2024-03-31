import React from "react";
import LandingLayout from "../layouts/LandingLayouts";
import BreadCrumb from "../components/BreadCrumb";

function ContactPage(props: any) {
  return (
    <LandingLayout>
      <div className="container">
        <BreadCrumb
          ghostLink={[{ name: "Home", link: "/" }]}
          activeLink={{ name: "Contact", link: "/contact" }}
        />
        Contact Page
      </div>
    </LandingLayout>
  );
}

export default ContactPage;
