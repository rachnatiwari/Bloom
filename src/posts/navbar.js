import "./posts.css";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EjectIcon from "@mui/icons-material/Eject";

function NavBar() {
  return (
    <div className="posts-navbar">
      <div className="navbar-category" id="hot">
        <WhatshotIcon fontSize="small" style={{ paddingRight: "5%" }} />
        Hot
      </div>
      <div className="navbar-category" id="new">
        <NewReleasesOutlinedIcon
          fontSize="small"
          style={{ paddingRight: "5%" }}
        />
        New
      </div>
      <div className="navbar-category" id="top">
        <EjectIcon fontSize="small" style={{ paddingRight: "5%" }} />
        Top
      </div>
      <div className="navbar-category" id="rising">
        <TrendingUpIcon fontSize="small" style={{ paddingRight: "5%" }} />
        Rising
      </div>
      {/* <div style={{'float':'right'}}>display</div> this is for when change display */}
    </div>
  );
}

export default NavBar;
