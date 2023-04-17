import Image from "next/image";
import React, { ReactNode, memo, useRef, useState } from "react";
import avatar_img from "../../public/img/img_avatar.png";
import { deleteCookie } from "cookies-next";
import { Menu } from "@headlessui/react";
import FullScreen_off_Icon from "@/svgIcon/FullScreen_off_Icon";
import FullScreen_on_Icon from "@/svgIcon/FullScreen_on_Icon";
import useFullscreen from "react-use/lib/useFullscreen";
import Hamburger_Icon from "@/svgIcon/Hamburger_Icon";
import Table from "./Table";
const Dashborad = ({ handleNavClick }: { handleNavClick: () => void }) => {
  const ref = useRef(null);
  const [toggle, setToggle] = useState(false);
  const isFullscreen = useFullscreen(ref, toggle, {
    onClose: () => setToggle(false),
  });

  let logout = () => {
    deleteCookie("auth");
    window.open("/login", "_self");
  };

  return (
    <div className="lg:ml-[250px] bg-white" ref={ref}>
      <div className="py-3 px-3 sm:px-5 flex justify-between items-center gap-5">
        <div className="flex items-center gap-3">
          {!isFullscreen && (
            <button
              className="flex  items-center justify-center lg:hidden"
              onClick={handleNavClick}
            >
              <span className=" inline-block w-7 h-7 text-gray-700">
                <Hamburger_Icon />
              </span>
            </button>
          )}

          <div>
            <h3 className="text-sm text-gray-800 font-medium">Leads</h3>
            <p className="text-xs text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>

        <div className="flex  items-center gap-2">
          <button
            className="text-gray-500 w-8 h-8 flex  items-center justify-center"
            onClick={() => setToggle((prev) => !prev)}
          >
            <span className="inline-block w-6 h-6 text-inherit">
              {isFullscreen ? <FullScreen_off_Icon /> : <FullScreen_on_Icon />}
            </span>
          </button>

          <Menu as="div" className="relative inline-block ">
            <Menu.Button className=" overflow-hidden shrink-0 w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center">
              <Image src={avatar_img} alt="avatar" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right  rounded-md bg-white   focus:outline-none z-10 border border-gray-300">
              <Menu.Item>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-gray-500 text-lg hover:text-gray-400"
                >
                  Log out
                </button>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <Table />
    </div>
  );
};

export default Dashborad;
