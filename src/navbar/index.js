import "./navbar.css";
import SearchBar from "./searchBar";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function NavBar() {
  return (
    <div className="navbar">
      <div className="bloom-icon">
        <img src={require("../images/icon.png")} alt="bloom" />
      </div>
      <div className="bloom">
        <img src={require("../images/name.png")} alt="bloom" />
      </div>
      <SearchBar />
        {/* <button className="login">Login</button><button className='person'>Person</button> */}
        <button className='login'>Log In</button>
        <button className='signup'>Sign Up</button>
        <div className='user'>
          <PersonOutlineIcon style={{'fontSize':'2.2rem', 'color':'rgba(121, 119, 119, 0.717)'}}/>
          <ExpandMoreIcon style={{'fontSize':'1.3rem','paddingBottom':'10%', 'color':'rgba(121, 119, 119, 0.717)'}}/>
        </div>
    </div>
  );
}

export default NavBar;
