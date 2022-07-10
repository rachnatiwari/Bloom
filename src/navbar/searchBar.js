import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  return (
    <div className="search">
      <div>
        <SearchIcon style={{ color: "rgba(121, 119, 119, 0.717)" }} />
      </div>
      <div className="search-reddit"><span>Search Reddit</span>
      </div>
    </div>
  );
}

export default SearchBar;
