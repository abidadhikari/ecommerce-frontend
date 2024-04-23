import React from "react";
import { Link } from "react-router-dom";

function BreadCrumb(props: any) {
  const { ghostLink, activeLink } = props;
  return (
    <div className="flex items-center gap-3 text-sm my-20">
      {ghostLink.map((e: any) => {
        return (
          <div className="flex items-center  gap-3 text-[#00000050]">
            <Link to={e?.link}>{e.name}</Link> <div>/</div>
          </div>
        );
      })}
      <div className="capitalize">{activeLink.name}</div>
    </div>
  );
}

export default BreadCrumb;
