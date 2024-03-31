import { Icon } from "@mui/material";
import React from "react";
// import { Icon } from "ts-react-feather-icons";

interface MyIconProps {
  name: string | undefined;
}

function MyIcon(props: MyIconProps) {
  const { name } = props;
  return (
    <>
      Icon{/* <Icon name={name || "x-octagon"} size={16} /> */}
      <Icon />
    </>
  );
}

export default MyIcon;
