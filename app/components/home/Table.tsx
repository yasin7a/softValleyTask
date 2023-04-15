import Search_Icon from "@/svgIcon/Search_Icon";
import React, { memo } from "react";

let Table = () => {
  return (
    <>
      <div className="py-4 px-4 bg-gray-100">
        <div className="flex justify-end items-center relative max-w-[15rem]">
          <input
            type="text"
            className="w-full bg-transparent px-3 py-1 focus:outline-none border border-gray-400 rounded-md focus:ring-2 ring-gray-600 focus:border-transparent"
            placeholder="Search in Lead Table..."
          />
          <button className="absolute flex justify-center items-center pr-2">
            <span className=" inline-block w-5 h-5 text-gray-500">
              <Search_Icon />
            </span>
          </button>
        </div>
      </div>

      {/* ==================== */}












      
    </>
  );
};

export default memo(Table);
