import * as React from "react";
// import "./App.css";
import NavBar from "./navbar/index";
import TrendingToday from "./trending/trendingToday";
import Posts from "./posts/index";
import SideBar from "./sidebar/index";
import { useEffect } from "react";
import LeftMenu from "./leftmenu";

function Home() {
  useEffect(() => {
    document.title = "Bloom";
  });
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <LeftMenu />
      <main className="w-full max-w-6xl mx-auto flex flex-col gap-6 px-4 py-8" style={{ paddingLeft: 0 }}>
        <TrendingToday />
        <span className="text-base font-medium">Popular Posts</span>
        <div className="flex flex-row gap-8">
          <div className="flex-1">
            <Posts />
          </div>
          <aside className="w-80 hidden lg:block">
            <SideBar />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Home;
