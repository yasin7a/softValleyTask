import LeftArrow_icon from "@/svgIcon/LeftArrow_icon";
import Refresh_Icon from "@/svgIcon/Refresh_Icon";
import RightArrow_Icon from "@/svgIcon/RightArrow_Icon";
import SkipLeftArrow_Icon from "@/svgIcon/SkipLeftArrow_Icon";
import SkipRighttArrow_Icon from "@/svgIcon/SkipRighttArrow_Icon";
import React, { ReactNode } from "react";
import { ChangeEventType } from "./Table";
import { paginationType } from "@/apis/qurery_mutations";

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
let Select = ({
  label,
  data,
  handlePagination,
  pagination,
}: {
  pagination: paginationType;
  label: string;
  data: any[];
  handlePagination: (event: ChangeEventType) => void;
}) => (
  <div className="select min-w-[5rem] relative">
    <label
      htmlFor="selcte"
      className="text-[12px] text-gray-500 bg-white px-1 py-0.5 absolute -top-3 left-2"
    >
      {label}
    </label>

    <select
      value={pagination.page}
      // @ts-ignore
      onChange={handlePagination}
      id="selcte"
      className="w-full appearance-none text-gray-500/80 border border-[#e5e5ea]  py-2 rounded-md bg-white cursor-pointer text-sm font-normal px-2"
    >
      {label == "Jump to" && <option value="">0</option>}
      {data?.map((item) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  </div>
);

const TablePagination = ({
  items,
  handlePagination,
  pagination,
  handleResetPagination,
  handlePaginationButton,
}: {
  items: any;
  handlePagination: (event: ChangeEventType) => void;
  pagination: paginationType;
  handleResetPagination: () => void;
  handlePaginationButton: (
    current_page: number | null,
    last_page: number | null,
    pageLimit: number
  ) => void;
}) => {
  const pages = Array.from({ length: items?.last_page }, (_, i) => i + 1);
  const jumto = generateArray(10, items?.last_page, 10);

  return (
    <div className="flex justify-end flex-col sm:flex-row items-center p-2 gap-4 border-t border-gray-200 pt-6">
      <ButtonIcon handleClick={handleResetPagination}>
        <Refresh_Icon />
      </ButtonIcon>

      <Select
        label="Page"
        data={pages}
        handlePagination={handlePagination}
        pagination={pagination}
      />

      <div>
        {items?.from && (
          <p className="text-sm text-gray-500">
            showing {items?.from}-{items?.to} of {items?.last_page}{" "}
          </p>
        )}
      </div>
      <div className="flex justify-end items-center gap-2">
        <ButtonIcon
          handleClick={() =>
            handlePaginationButton(items?.current_page, null, 5)
          }
        >
          <SkipLeftArrow_Icon />
        </ButtonIcon>
        <ButtonIcon
          handleClick={() =>
            handlePaginationButton(items?.current_page, null, 1)
          }
        >
          <LeftArrow_icon />
        </ButtonIcon>

        <Select
          label="Jump to"
          data={jumto}
          handlePagination={handlePagination}
          pagination={pagination}
        />

        <ButtonIcon
          handleClick={() => handlePaginationButton(null, items?.last_page, 1)}
        >
          <RightArrow_Icon />
        </ButtonIcon>
        <ButtonIcon
          handleClick={() => handlePaginationButton(null, items?.last_page, 5)}
        >
          <SkipRighttArrow_Icon />
        </ButtonIcon>
      </div>
    </div>
  );
};

export default TablePagination;
function generateArray(start: number, end: number, interval: number) {
  let numbers = [];
  let currentValue = start;
  while (currentValue <= end) {
    numbers.push(currentValue);
    currentValue += interval;
  }
  return numbers;
}
