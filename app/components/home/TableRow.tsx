import React, { memo, useState } from "react";
import Loader from "../Loader";
import tableHead from "@/data/data_table_head";
import Edit_Icon from "@/svgIcon/Edit_Icon";
import Image from "next/image";
import Aanalytics_Icon from "@/svgIcon/Aanalytics_Icon";
import Delete_Icon from "@/svgIcon/Delete_Icon";
import { ChangeEventType } from "./Table";
export interface Item {
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


const TableRow = ({
  isLoading,
  isError,
  items,
}: {
  isLoading: boolean;
  isError: boolean;
  items: Item[];
}) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleSelectAll = (event: ChangeEventType) => {
    if (selectedItems.length === items.length || !event.target.value) {
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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isError ? (
            <p className="text-center text-red-700 text-xl py-8">
              Oops! Somthing went wrong!
            </p>
          ) : items.length > 0 ? (
            <div className="flex flex-col">
              <table className=" divide-y divide-gray-200 ">
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
                            item === tableHead[0]
                              ? "flex gap-8 items-center"
                              : ""
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

                <tbody className="bg-white divide-y divide-gray-200 ">
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
        </>
      )}
    </>
  );
};

export default memo(TableRow);
