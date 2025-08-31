
import * as React from "react";
import TopCommunities from './topCommunities';
import Premium from "./premium";
import Footer from "./footer";

function SideBar() {
  return (
    <aside className="flex flex-col gap-4 w-full">
      <TopCommunities />
      {/* <Premium /> */} 
      <Footer />
    </aside>
  );
}

export default SideBar;
