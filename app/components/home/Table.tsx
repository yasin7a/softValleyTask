import Aanalytics_Icon from "@/svgIcon/Aanalytics_Icon";
import Delete_Icon from "@/svgIcon/Delete_Icon";
import Edit_Icon from "@/svgIcon/Edit_Icon";
import Search_Icon from "@/svgIcon/Search_Icon";
import Image from "next/image";
import React, { memo, useState } from "react";
import DateRangePicker from "rsuite/DateRangePicker";
import avatar_img from "../../public/img_avatar.png";

interface Item {
  id: number;
  leads: string;
  phone: string;
  followup_date: string;
  last_note: string;
  assigned: any[];
  email: string;
  preferred_countries: string;
  status: string;
  source: string;
  action: boolean;
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
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      leads: "yujtyut",
      phone: "015464564",
      followup_date: "-",
      last_note: "no notes created",
      assigned: [avatar_img, avatar_img],
      email: "cfd@gmail.com",
      preferred_countries: "Banglades",
      status: "new",
      source: "Facebook",
      action: true,
    },
    {
      id: 2,
      leads: "yujtyut",
      phone: "015464564",
      followup_date: "-",
      last_note: "no notes created",
      assigned: [avatar_img],
      email: "cfd@gmail.com",
      preferred_countries: "Banglades",
      status: "new",
      source: "Facebook",
      action: true,
    },
  ]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.id));
    }
  };

  const handleSelectItem = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };
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
      <div className=" overflow-auto min-w-[50rem]">
        <div className="grid grid-cols-5 gap-2 p-4">
          <div>
            <div className="select w-full relative">
              <select className="w-full appearance-none text-gray-500/80 border border-[#e5e5ea] px-1 py-[7px] rounded-md bg-white cursor-pointer text-sm font-normal">
                <option selected disabled>
                  Statuses
                </option>
                <option value="pdf">PDF</option>
              </select>
            </div>
          </div>
          <div>
            <div className="select w-full relative">
              <select className="w-full appearance-none text-gray-500/80 border border-[#e5e5ea] px-1 py-[7px] rounded-md bg-white cursor-pointer text-sm font-normal">
                <option selected disabled>
                  Sourses
                </option>
                <option value="pdf">PDF</option>
              </select>
            </div>
          </div>
          <div>
            <div className="select w-full relative">
              <select className="w-full appearance-none text-gray-500/80 border border-[#e5e5ea] px-1 py-[7px] rounded-md bg-white cursor-pointer text-sm font-normal">
                <option selected disabled>
                  Assingnees
                </option>
                <option value="pdf">PDF</option>
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
                    <div
                      className={`${
                        item === tableHead[0] ? "flex gap-8 items-center" : ""
                      } `}
                    >
                      {item === tableHead[0] && (
                        <input type="checkbox" onChange={handleSelectAll} />
                      )}
                      <span>{item}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4  text-xs text-gray-500 ">
                    <div className="flex gap-8 items-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                      />
                      <span>{item.leads}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4  text-xs text-gray-500">
                    {item.phone}
                  </td>{" "}
                  <td className="px-6 py-4  text-xs text-gray-500">
                    {item.followup_date}
                  </td>{" "}
                  <td className="px-6 py-4  text-xs text-gray-500 ">
                    <div className="flex gap-8 items-center">
                      <span> {item.last_note}</span>
                      <button className="w-5 h-6 hover:opacity-90">
                        <Edit_Icon />
                      </button>
                    </div>
                  </td>{" "}
                  <td className="px-6 py-4  text-xs text-gray-500">
                    {item.assigned.map((item, i) => (
                      <span
                        className="w-9 h-9 -mr-2 inline-block rounded-full overflow-hidden border-4 border-white"
                        key={i}
                      >
                        <Image src={item} alt="avatar" />
                      </span>
                    ))}
                  </td>{" "}
                  <td className="px-6 py-4  text-xs text-gray-500">
                    {item.email}
                  </td>{" "}
                  <td className="px-6 py-4  text-xs text-gray-500">
                    {item.preferred_countries}
                  </td>{" "}
                  <td className="px-6 py-4  text-xs text-blue-500">
                    {item.status}
                  </td>{" "}
                  <td className="px-6 py-4  text-xs text-gray-500">
                    {item.source}
                  </td>{" "}
                  <td className="px-6 py-4  text-xs text-gray-500">
                    {item.action && (
                      <span className="flex gap-3 items-center">
                        <button className="w-5 h-6 hover:opacity-90">
                          <Aanalytics_Icon />
                        </button>{" "}
                        <button className="w-5 h-6 hover:opacity-90">
                          <Edit_Icon />
                        </button>{" "}
                        <button className="w-5 h-6 hover:opacity-90">
                          <Delete_Icon />
                        </button>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default memo(Table);
