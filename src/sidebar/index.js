import "./sidebar.css";
import TopCommunities from './topCommunities'
import Premium from "./premium";
import Footer from "./footer";

function SideBar() {
  return (
  <div className="sidebar">
    <TopCommunities />
    <Premium />
    {/* <div className='sidebar-box popular-community'>Popular Communities</div> */}
    <Footer />
  </div>
  );
}

export default SideBar;
