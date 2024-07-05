import React from "react";
import LandingLayout from "../layouts/LandingLayouts";
import BreadCrumb from "../components/BreadCrumb";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CompanyPromises from "../components/CompanyPromises";

function AboutPage() {
  return (
    <LandingLayout>
      <div className="container">
        <BreadCrumb
          ghostLink={[{ name: "Home", link: "/" }]}
          activeLink={{ name: "About", link: "#" }}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="h-[336px] w-[525px] ml-[135px]">
          <p className="text-5xl font-semibold">Our Story</p>
          <p className="pt-12">
            Launched in 2020, exclusive in South Asia's premier online shopping
            marketplace with an active presence in Nepal. Supported by wide
            range of tailored marketing, data and service solutions. Swastik
            Store has 10,500 sellers and 300 brands and serves 3 millions
            customers across the region.
          </p>
          <p className="pt-5">
            Swastik Store has more than 1 million products, to offer, growing at
            a very fast rate. Swastik Store offers a diverse assortment in
            categories ranging from consumer.
          </p>
        </div>
        <div>
          <img src="public/Side Image.svg" alt="SideImage" />
        </div>
      </div>
      <div className="mx-32 pt-32 flex justify-between">
        <div className="border rounded border-gray-400 h-[230px] w-[270px] flex flex-col justify-center items-center hover:bg-red-500 hover:text-white">
          <div className="h-20 w-20 bg-[#2F2E3030] rounded-full grid place-items-center">
            <div className="h-[58px] w-[58px] bg-black rounded-full text-white grid place-items-center">
              <div>
                <StorefrontIcon className="!text-[35px]" />
              </div>
            </div>
          </div>
          <div className="text-[32px] font-semibold pt-3">10.5k</div>
          <div className="text-sm">Sellers active in our site</div>
        </div>
        <div className="border rounded border-gray-400 h-[230px] w-[270px] flex flex-col justify-center items-center hover:bg-red-500 hover:text-white">
          <div className="h-20 w-20 bg-[#2F2E3030] rounded-full grid place-items-center">
            <div className="h-[58px] w-[58px] bg-black rounded-full text-white grid place-items-center">
              <div>
                <MonetizationOnIcon className="!text-[35px]" />
              </div>
            </div>
          </div>
          <div className="text-[32px] font-semibold pt-3">33k</div>
          <div className="text-sm">Monthly product sale</div>
        </div>
        <div className="border rounded border-gray-400 h-[230px] w-[270px] flex flex-col justify-center items-center hover:bg-red-500 hover:text-white">
          <div className="h-20 w-20 bg-[#2F2E3030] rounded-full grid place-items-center">
            <div className="h-[58px] w-[58px] bg-black rounded-full text-white grid place-items-center">
              <div>
                <ShoppingBagIcon className="!text-[35px]" />
              </div>
            </div>
          </div>
          <div className="text-[32px] font-semibold pt-3">45.5k</div>
          <div className="text-sm">Customers active in our site</div>
        </div>
        <div className="border rounded border-gray-400 h-[230px] w-[270px] flex flex-col justify-center items-center hover:bg-red-500 hover:text-white">
          <div className="h-20 w-20 bg-[#2F2E3030] rounded-full grid place-items-center">
            <div className="h-[58px] w-[58px] bg-black rounded-full text-white grid place-items-center">
              <div>
                <PriceCheckIcon className="!text-[35px]" />
              </div>
            </div>
          </div>
          <div className="text-[32px] font-semibold pt-3">25k</div>
          <div className="text-sm">Annual gross sale in our site</div>
        </div>
      </div>
      <div className="mx-32 flex">
        <div className="pt-32 w-[370px]">
          <div className="bg-[#F5F5F5] flex justify-center">
            <img src="public/Tom.svg" alt="" className=""/>
          </div>
          <div className="text-3xl font-semibold pt-7">Tom Cruise</div>
          <div className="text-sm">Founder & Chairman</div>
          <div className="pt-3">
            <XIcon className="mr-4" />
            <InstagramIcon className="mr-4" />
            <LinkedInIcon />
          </div>
        </div>
        <div className="pt-32 ml-[135px] w-[370px]">
          <div className="bg-[#F5F5F5] flex justify-center">
            <img src="public/Emma.svg" alt="" />
          </div>
          <div className="text-3xl font-semibold pt-7">Emma Watson</div>
          <div className="text-sm">Managing Director</div>
          <div className="pt-3">
            <XIcon className="mr-4" />
            <InstagramIcon className="mr-4" />
            <LinkedInIcon />
          </div>
        </div>
        <div className="pt-32 ml-[135px] w-[370px]">
          <div className="bg-[#F5F5F5] flex justify-center">
            <img src="public/Will.svg" alt="" />
          </div>
          <div className="text-3xl font-semibold pt-7">Will Smith</div>
          <div className="text-sm">Product Designer</div>
          <div className="pt-3">
            <XIcon className="mr-4" />
            <InstagramIcon className="mr-4" />
            <LinkedInIcon />
          </div>
        </div>
      </div>
      <div>
        <CompanyPromises />
      </div>
    </LandingLayout>
  );
}

export default AboutPage;
