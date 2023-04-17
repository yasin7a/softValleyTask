import LeftArrow_icon from "@/svgIcon/LeftArrow_icon";
import Refresh_Icon from "@/svgIcon/Refresh_Icon";
import RightArrow_Icon from "@/svgIcon/RightArrow_Icon";
import SkipLeftArrow_Icon from "@/svgIcon/SkipLeftArrow_Icon";
import SkipRighttArrow_Icon from "@/svgIcon/SkipRighttArrow_Icon";
import React, { ReactNode } from "react";

let ButtonIcon = ({
  children,
  className,
  handleClick,
}: {
  children: ReactNode;
  className?: string;
  handleClick: () => void;
}) => (
  <button
    className="text-gray-500 hover:opacity-60 flex justify-center items-center"
    onClick={handleClick}
  >
    <span className={`inline-block w-6 h-6 ${className}`}>{children}</span>
  </button>
);
let Select = ({ label }: { label: string }) => (
  <div className="select min-w-[5rem] relative">
    <label
      htmlFor="selcte"
      className="text-[12px] text-gray-500 bg-white px-1 py-0.5 absolute -top-3 left-2"
    >
      {label}
    </label>
    <select
      id="selcte"
      className="w-full appearance-none text-gray-500/80 border border-[#e5e5ea]  py-2 rounded-md bg-white cursor-pointer text-sm font-normal px-2"
    >
      <option value={"10"}>10</option>
    </select>
  </div>
);
const TablePagination = () => {
  let handleClick = () => {};
  return (
    <div className="flex justify-end items-center p-2 gap-4">
      <ButtonIcon handleClick={handleClick}>
        <Refresh_Icon />
      </ButtonIcon>

      <Select label="Page" />

      <div>
        <p className="text-sm text-gray-500">showing 1-10 of 130 </p>
      </div>
      <div className="flex justify-end items-center gap-2">
        <ButtonIcon handleClick={handleClick}>
          <SkipLeftArrow_Icon />
        </ButtonIcon>
        <ButtonIcon handleClick={handleClick}>
          <LeftArrow_icon />
        </ButtonIcon>

        <Select label="Jump to" />

        <ButtonIcon handleClick={handleClick}>
          <RightArrow_Icon />
        </ButtonIcon>
        <ButtonIcon handleClick={handleClick}>
          <SkipRighttArrow_Icon />
        </ButtonIcon>
      </div>
    </div>
  );
};

export default TablePagination;
