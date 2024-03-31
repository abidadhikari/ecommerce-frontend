import React from "react";

function CategoryButton(props: any) {
  const { title, icon: Icon } = props;
  return (
    <div className="h-[145px] w-[170px] border rounded-[4px] border-[#0000004D] flex flex-col items-center justify-center gap-4 text-gray-700 hover:text-white hover:bg-[#DB4444] cursor-pointer">
      <Icon style={{ fontSize: "48px" }} />
      {title}
    </div>
  );
}

export default CategoryButton;
