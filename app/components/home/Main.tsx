import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Dashborad from "./Dashborad";

const Main = () => {
  //  for toggle sidebar in  mobile
  let [toggleNav, setToggleNav] = useState(false);
  let handleNavClick = () => {
    setToggleNav((prev) => !prev);
  };
  return (
    <>
      {/* sidebar Dashborad */}
      <section>
        <Sidebar handleNavClick={handleNavClick} toggleNav={toggleNav} />
      </section>
      {/* fully funtionl table in dash board Dashborad */}
      <main>
        <Dashborad handleNavClick={handleNavClick} />
      </main>
    </>
  );
};

export default Main;
