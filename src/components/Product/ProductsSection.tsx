import React from "react";
import { ButtonPrimary } from "../utils/Buttons";
import { Link } from "react-router-dom";

function ProductsSection(props: any) {
  const { children, title, bigTitle, topSection } = props;
  return (
    <div className=" mt-20 mb-20">
      <div className="flex items-center gap-4 mb-5 mt-4">
        <div className="h-[40px] w-[20px] rounded-[4px] bg-[#DB4444]"></div>
        <div className="text-[#DB4444]">{title}</div>
      </div>

      <>
        <div className="flex justify-between">
          <div className="font-semibold text-[20px] md:text-[36px] leading-[48px]">
            {bigTitle}
          </div>
          <Link to="/search">
            <ButtonPrimary text="View All" />
          </Link>
        </div>
      </>

      {children}
    </div>
  );
}

export default ProductsSection;
