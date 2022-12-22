import "./navbar.css";
import SearchBar from "./searchBar";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import Login from "../login";

function NavBar() {
  return (
    <div className="navbar">
      <div className="bloom-icon">
        <Link to="/">
          <img src={require("../images/icon.png")} alt="bloom" />
        </Link>
      </div>
      <div className="bloom">
        <Link to="/">
          <img src={require("../images/name.png")} alt="bloom" />
        </Link>
      </div>

      <SearchBar />
      <Login />
      <div className="user">
        <PersonOutlineIcon
          style={{ fontSize: "2.2rem", color: "rgba(121, 119, 119, 0.717)" }}
        />
        <ExpandMoreIcon
          style={{
            fontSize: "1.3rem",
            paddingBottom: "10%",
            color: "rgba(121, 119, 119, 0.717)",
          }}
        />
      </div>
    </div>
  );
}

export default NavBar;
