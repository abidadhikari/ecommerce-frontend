import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function DashboardRightHeader(props: any) {
  const navigate = useNavigate();
  return (
    <div className=" h-10 flex items-center justify-between">
      <button
        type="button"
        className="rounded-lg bg-slate-50 p-2 text-[#DB4444] shadow-sm"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon />
      </button>
      <div className="h-10 w-10 bg-gray-600 rounded-full shadow-sm overflow-hidden">
        .
      </div>
    </div>
  );
}

export default DashboardRightHeader;
