import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Dashborad from "./Dashborad";

const Main = () => {
  let [toggleNav, setToggleNav] = useState(false);
  let handleNavClick = () => {
    setToggleNav((prev) => !prev);
  };
  return (
    <>
      <section>
        <Sidebar handleNavClick={handleNavClick} toggleNav={toggleNav} />
      </section>

      <main>
        <Dashborad handleNavClick={handleNavClick} />
      </main>
    </>
  );
};

export default Main;
