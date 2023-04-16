import Aanalytics_Icon from "@/svgIcon/Aanalytics_Icon";
import Delete_Icon from "@/svgIcon/Delete_Icon";
import Edit_Icon from "@/svgIcon/Edit_Icon";
import Search_Icon from "@/svgIcon/Search_Icon";
import Image from "next/image";
import React, { memo, useState } from "react";
import DateRangePicker from "rsuite/DateRangePicker";
import {
  useGetAssign,
  useGetSource,
  useGetStatus,
  useList,
} from "@/apis/qurery_mutations";
import Loader from "../Loader";
import { useQueryClient } from "@tanstack/react-query";
import useThrottle from "react-use/lib/useThrottle";
import { useDebounce } from "react-use";

interface Item {
  id: number;
  name: string;
  phone: string;
  followup_date: string;
  lead_notes: any[];
  lead_assignees: any[];
  email: string;
  country: {
    name: string;
  };
  lead_status: {
    name: string;
    color: string;
  };
  source: {
    name: string;
  };
}

let tableHead = [
  "Leads",
  "Phone",
  "Followup Date",
  "Last note",
  "Assigned",
  "Email",
  "Preferred Countries",
  "Status",
  "Source",
  "Actions",
];

let Table = () => {
  let { data: datastatus, isLoading: isloadStatus } = useGetStatus();
  let { data: dataSource, isLoading: isloadSource } = useGetSource();
  let { data: dataAssign, isLoading: isloadAssign } = useGetAssign();
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [debouncedValue, setDebouncedValue] = React.useState("");
  let { data: items, isLoading } = useList({ search: query }, debouncedValue);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item: { id: any }) => item.id));
    }
  };

  const handleSelectItem = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }
  useDebounce(
    () => {
      queryClient.invalidateQueries(["Lead_list"]);
      setDebouncedValue(query);
    },
    1000,
    [query]
  );
  console.log(datastatus);

  return (
    <>
      <div className="py-4 px-4 bg-gray-100">
        <div className="flex justify-end items-center relative max-w-[15rem]">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
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
      <div className=" overflow-auto min-w-[50rem]">
        <div className="grid grid-cols-5 gap-2 p-4">
          <div>
            <div className="select w-full relative">
              <select className="w-full appearance-none text-gray-500/80 border border-[#e5e5ea] px-1 py-[7px] rounded-md bg-white cursor-pointer text-sm font-normal">
                <option value="">
                  {isloadStatus ? "loadaing..." : "Statuses"}
                </option>
                {datastatus?.map((status: { id: number; name: string }) => (
                  <option key={status.id} value={status.name}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className="select w-full relative">
              <select className="w-full appearance-none text-gray-500/80 border border-[#e5e5ea] px-1 py-[7px] rounded-md bg-white cursor-pointer text-sm font-normal">
                <option value="">
                  {isloadSource ? "loadain..." : "Sources"}
                </option>
                {dataSource?.map((status: { id: number; name: string }) => (
                  <option key={status.id} value={status.name}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className="select w-full relative">
              <select className="w-full appearance-none text-gray-500/80 border border-[#e5e5ea] px-1 py-[7px] rounded-md bg-white cursor-pointer text-sm font-normal">
                <option value="">
                  {isloadAssign ? "loadaing..." : "Assignees"}
                </option>
                {dataAssign?.map((status: { id: number; name: string }) => (
                  <option key={status.id} value={status.name}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <DateRangePicker
              appearance="default"
              placeholder="Contacted date"
              className="w-full"
              placement="bottomEnd"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className=" text-white bg-gray-400 text-sm rounded-md  px-1">
              FIlter
            </button>
            <button className=" text-gray-400 border border-gray-400 text-sm rounded-md truncate px-1">
              Reset Filter
            </button>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : items.length > 0 ? (
          <div className="flex flex-col">
            <table className=" divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {tableHead.map((item, i) => (
                    <th
                      key={i}
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium  text-gray-600 tracking-wider `}
                    >
                      <span
                        className={`${
                          item === tableHead[0] ? "flex gap-8 items-center" : ""
                        } `}
                      >
                        {item === tableHead[0] && (
                          <input type="checkbox" onChange={handleSelectAll} />
                        )}
                        <span>{item}</span>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item: Item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4  text-xs text-gray-500 ">
                      <span className="flex gap-8 items-center">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                        />
                        <span>{item.name}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4  text-xs text-gray-500">
                      {item.phone}
                    </td>
                    <td className="px-6 py-4  text-xs text-gray-500">
                      {item.followup_date || "-"}
                    </td>
                    <td className="px-6 py-4  text-xs text-gray-500 ">
                      <span className="flex gap-8 items-center">
                        {item?.lead_notes.length > 0 ? (
                          <>
                            <span>{item?.lead_notes[0].note}</span>
                            <button className="w-5 h-6 hover:opacity-90">
                              <Edit_Icon />
                            </button>
                          </>
                        ) : (
                          "-"
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4  text-xs text-gray-500">
                      {item.lead_assignees.map((item) => (
                        <span
                          className="w-9 h-9 -mr-2 inline-block rounded-full overflow-hidden border-4 border-white"
                          key={item?.id}
                        >
                          <Image
                            src={
                              "https://crm.softvalley.sveducrm.com/" +
                              item?.image
                            }
                            alt=""
                            width={120}
                            height={120}
                            className="bg-gray-300"
                          />
                        </span>
                      ))}
                    </td>
                    <td className="px-6 py-4  text-xs text-gray-500">
                      {item.email || "-"}
                    </td>
                    <td className="px-6 py-4  text-xs text-gray-500">
                      {item?.country ? item?.country.name : "-"}
                    </td>
                    <td className="px-6 py-4  text-xs text-blue-500">
                      <span
                        style={{
                          color: item.lead_status.color,
                        }}
                      >
                        {item.lead_status.name}
                      </span>
                    </td>
                    <td className="px-6 py-4  text-xs text-gray-500">
                      {item.source.name}
                    </td>
                    <td className="px-6 py-4  text-xs text-gray-500">
                      <span className="flex gap-3 items-center">
                        <button className="w-5 h-6 hover:opacity-90">
                          <Aanalytics_Icon />
                        </button>
                        <button className="w-5 h-6 hover:opacity-90">
                          <Edit_Icon />
                        </button>
                        <button className="w-5 h-6 hover:opacity-90">
                          <Delete_Icon />
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-700 text-xl py-8">
            Oops! No content
          </p>
        )}
      </div>
    </>
  );
};

export default memo(Table);
