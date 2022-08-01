import "./sidebar.css";

function Premium() {
  return (
    <div className="sidebar-box premium">
      <div className="premium-content">
        <div className="premium-icon">
          <img src={require("../images/premium.png")} alt="premium icon" style={{'maxWidth': '100%'}} />
        </div>
        <div className="premium-text">
          <div style={{ paddingBottom: "1%", fontWeight: "bold" }}>
            Reddit Premium
          </div>
          <div>The best Reddit experience, with monthly Coins</div>
        </div>
      </div>
      <a href="https://www.reddit.com/premium">
      <button style={{ backgroundColor: "rgb(255,69,0)" }} className='sidebar-button'>Try Now</button></a>
    </div>
  );
}

export default Premium;
