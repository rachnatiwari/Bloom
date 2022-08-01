import "./App.css";
import NavBar from "./navbar";
import TrendingToday from "./trending/trendingToday";
import Posts from "./posts";
import SideBar from "./sidebar";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    document.title = "Bloom";
  });
  return (
    <div className="App">
      <NavBar />
      <div className="app-body">
        <TrendingToday />
        <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>
          Popular Posts{" "}
        </span>
        <div className="content">
          <Posts />
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default Home;
