import React from "react";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";

function CompanyPromises() {
  const data = [
    {
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
      Icon: LocalShippingOutlinedIcon,
    },
    {
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
      Icon: SupportAgentOutlinedIcon,
    },
    {
      title: "MONEY BACK GUARANTEE",
      description: "We reurn money within 30 days",
      Icon: GppGoodOutlinedIcon,
    },
  ];
  return (
    <div className="flex gap-20 justify-center my-36 flex-wrap">
      {data.map((item: any) => {
        return (
          <div className="flex flex-col justify-center items-center">
            <div className="h-20 w-20 bg-[#2F2E3030]  rounded-full grid place-items-center mb-6">
              <div className="h-[58px] w-[58px] bg-black rounded-full grid place-items-center text-white">
                <item.Icon style={{ fontSize: 35 }} />
              </div>
            </div>
            <div className="text-[20px] leading-7 font-semibold mb-2">
              {item.title}
            </div>
            <div className="text-sm">{item.description}</div>
          </div>
        );
      })}
    </div>
  );
}

export default CompanyPromises;
