import "./trending.css";
import TrendingPost from "./trendingPost";

function trendingToday() {
  return (
    <div className="trending-navbar">
      <div style={{'marginBottom':'1%', 'fontSize':'0.9rem', 'fontWeight':'500'}}>Trending today</div>
      <div className="trending-content">
        <span className="trending-post" style={{'marginLeft':'0%'}}><TrendingPost /></span>
        <span className="trending-post"><TrendingPost /></span>
        <span className="trending-post"><TrendingPost /></span>
        <span className="trending-post" style={{'marginRight':'0%'}}><TrendingPost /></span>
      </div>
    </div>
  );
}

export default trendingToday;
