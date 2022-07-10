import "./App.css";
import NavBar from "./navbar";
import TrendingToday from "./trending/trendingToday";
import Posts from "./posts";
import SideBar from "./sidebar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="app-body">
        <TrendingToday />
        <span style={{'fontSize':'0.9rem', 'fontWeight':'500'}}>Popular Posts </span>
        <div className="content">
          <Posts />
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default App;
