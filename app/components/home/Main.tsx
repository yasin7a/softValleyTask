import React from "react";
import Sidebar from "./Sidebar";
import Dashborad from "./Dashborad";

const Main = () => {
  return (
    <>
      <section>
        <Sidebar />
      </section>

      <main>
        <Dashborad />
      </main>
    </>
  );
};

export default Main;
