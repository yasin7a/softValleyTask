import React from "react";
import Logo from "../Logo";
import User_Icon from "@/svgIcon/User_Icon";
import data_dashboard_nav from "@/data/data_dashboard_nav";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className=" h-screen  w-[250px] border-r border-gray-300 py-3">
      <div className="px-3">
        <Logo className="w-[10rem]" />
      </div>
      <div className="flex gap-3 items-center my-4 px-3">
        <div className=" shrink-0 w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
          <span className="inline-block w-6 h-6 text-black">
            <User_Icon />
          </span>
        </div>
        <div>
          <h5 className="text-sm text-gray-500">Hello! Good evening</h5>
          <h3 className="text-md text-gray-600">Admin</h3>
        </div>
      </div>

      <div className="border-t border-gray-300 py-4">
        <nav>
          <ul>
            {data_dashboard_nav.map((item, i) => {
              let isPath = router.pathname == item.path;
              return (
                <li key={i}>
                  <Link
                    href={item.path}
                    className={`${
                      isPath ? "bg-[#405189]" : ""
                    } flex gap-3 items-center px-3 py-2 hover:bg-[#405189] group `}
                  >
                    <span
                      className={`shrink-0 w-8 h-8  rounded-full flex justify-center items-center ${
                        isPath ? "text-white" : "text-gray-500 bg-gray-200"
                      }   group-hover:text-white group-hover:bg-transparent`}
                    >
                      <span className="inline-block w-5 h-5 text-inherit">
                        {item.icon}
                      </span>
                    </span>
                    <span
                      className={`${
                        isPath ? "text-white" : "text-gray-500"
                      } text-sm  group-hover:text-white`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
