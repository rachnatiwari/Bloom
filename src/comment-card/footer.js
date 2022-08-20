import "./comment-card.css";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState } from "react";

function Footer(props) {
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  function toggleShowMoreOption() {
    setShowMoreOptions(!showMoreOptions);
  }

  return (
    <div className="footer">
      <div className="footer-icon" style={{ width: "22%" }}>
        <ChatBubbleOutlineIcon fontSize="small" color="lightgray" />
        <div className="footer-text">32 Comments</div>
      </div>

      <div className="footer-icon" style={{ width: "13%" }}>
        <ShareIcon fontSize="small" color="lightgray" />
        <div className="footer-text">Share</div>
      </div>

      <div className="footer-icon" style={{ width: "12%" }}>
        {props.save ? (
          <BookmarkIcon fontSize="small" color="lightgray" />
        ) : (
          <BookmarkBorderIcon fontSize="small" color="lightgray" />
        )}
        <div className="footer-text">Save</div>
      </div>

      <div
        className="footer-icon footer-more-options"
        onMouseDown={toggleShowMoreOption}
      >
        <MoreHorizIcon fontSize="small" color="lightgray" />
      </div>
      {showMoreOptions && (
        <div className="dropdown">
          <div className="dropdown-content" style={{'top':'50%'}}>Hide</div>
          <div className="dropdown-content" style={{'top':'172%'}}>Report</div>
        </div>
      )}
    </div>
  );
}

export default Footer;
