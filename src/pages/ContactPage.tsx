import React from "react";
import LandingLayout from "../layouts/LandingLayouts";
import BreadCrumb from "../components/BreadCrumb";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

function ContactPage(props: any) {
  return (
    <LandingLayout>
      <div className="container">
        <BreadCrumb
          ghostLink={[{ name: "Home", link: "/" }]}
          activeLink={{ name: "Contact", link: "#" }}
        />
      </div>
      <div className="container">
        <div className="flex justify-between mb-28 w-full ">
          <div className="w-80  rounded shadow-xl px-7 py-7 ">
            <div className="flex items-center">
              <div className="rounded-full bg-red-600 p-1">
                <CallIcon className="text-white" />
              </div>
              <div>
                <p className="text-base font-semibold pl-4">Call To Us</p>
              </div>
            </div>
            <p className="pt-8 pb-3 text-sm">
              We are available 24/7, 7 days a week.
            </p>
            <p className="pb-8 border-b border-gray-500 text-sm">
              Phone: +8801611112222
            </p>
            <div className="flex pt-10 items-center">
              <div className="rounded-full bg-red-600 p-1">
                <MailOutlineIcon className="text-white" />
              </div>
              <div>
                <p className="text-base font-semibold pl-4">Write To Us</p>
              </div>
            </div>
            <p className="pt-8 pb-3 text-sm">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="pb-3 text-sm">Email: customer@exclusive.com</p>
            <p className="text-sm">Email: support@exclusive.com</p>
          </div>

          <div className="shadow-xl rounded px-7 py-10">
            <form action="">
              <input
                type="text"
                placeholder="Your Name*"
                className="p-3 bg-gray-100 border-white rounded mr-4"
              />
              <input
                type="text"
                placeholder="Your Email*"
                className="p-3 bg-gray-100 border-white rounded mr-4"
              />
              <input
                type="text"
                placeholder="Your Phone*"
                className="p-3 bg-gray-100 border-white rounded"
              />
              <div className="pt-6">
                <textarea
                  name="message"
                  id="message"
                  placeholder="Your Message"
                  className="p-3  bg-gray-100 border-white rounded h-48 w-full"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button className="py-4 px-12 rounded-sm bg-red-600 text-white mt-7">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}

export default ContactPage;
