import React from "react";

function DashboardRightContent(props: any) {
  const { children } = props;
  return (
    <div className="mt-4 p-5 bg-white shadow-sm min-h-full">{children}</div>
  );
}

export default DashboardRightContent;
