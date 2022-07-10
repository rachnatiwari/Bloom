import "./posts.css";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

function Card() {
  return (
    <div className="card">
      <div className="vote">
        <div>
          <ArrowUpwardRoundedIcon fontSize="medium" color="disabled"/>
        </div>
        651
        <div>
          <ArrowDownwardRoundedIcon fontSize="medium" color='disabled' style={{'marginTop':'10%'}}/>
        </div>
      </div>
      <div className="card-body">
        <div className="card-nav">subreddit name</div>
        <div className="title">title</div>
        <div className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div className="footer">footer</div>
      </div>
    </div>
  );
}

export default Card;
