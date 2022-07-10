import "./sidebar.css";

function TopCommunities() {
  return (
    <div className="sidebar-box top-community">
      <div className="header">
        <span>Top Communities</span>
      </div>
      <div className="community-card">
        <span className="sr-no">1</span>
        <span className="arrow">^</span>
        <span className="community-icon">
          <img
            src={require("../images/com-icon.png")}
            alt="Community Icon"
            style={{ maxWidth: "15%" }}
          />
        </span>
        Community Name
      </div>
      <div className="community-card">
        <span className="sr-no">1</span>
        <span className="arrow">^</span>
        <span className="community-icon">
          <img
            src={require("../images/com-icon.png")}
            alt="Community Icon"
            style={{ maxWidth: "15%" }}
          />
        </span>
        Community Name
      </div>
      <div className="community-card">
        <span className="sr-no">1</span>
        <span className="arrow">^</span>
        <span className="community-icon">
          <img
            src={require("../images/com-icon.png")}
            alt="Community Icon"
            style={{ maxWidth: "15%" }}
          />
        </span>
        Community Name
      </div>
      <div className="community-card">
        <span className="sr-no">1</span>
        <span className="arrow">^</span>
        <span className="community-icon">
          <img
            src={require("../images/com-icon.png")}
            alt="Community Icon"
            style={{ maxWidth: "15%" }}
          />
        </span>
        Community Name
      </div>
      <div className="community-card">
        <span className="sr-no">1</span>
        <span className="arrow">^</span>
        <span className="community-icon">
          <img
            src={require("../images/com-icon.png")}
            alt="Community Icon"
            style={{ maxWidth: "15%" }}
          />
        </span>
        Community Name
      </div>
      <button style={{ backgroundColor: "rgb(48,122,204)", marginTop: "5%" }} className='sidebar-button'>
        View All
      </button>
      <div className="other-tags">
        <span>Top</span>
        <span>Near You</span>
        <span>Gaming</span>
        <span>News</span>
      </div>
    </div>
  );
}

export default TopCommunities;
