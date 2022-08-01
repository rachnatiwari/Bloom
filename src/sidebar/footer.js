import "./sidebar.css";

function Footer() {
  return (
    <div className="sidebar-box reserved-rights">
      <div className="columns">
        <div className="left">
          <a href="https://www.reddithelp.com/">
            <div>Help</div>
          </a>
          <a href="https://www.reddit.com/coins">
            <div>Reddit Coins</div>
          </a>
          <a href="https://www.reddit.com/premium">
            <div>Reddit Premium</div>
          </a>
          <a href="https://www.reddit.com/subreddits/a-1/">
            <div>Communities</div>
          </a>
          <a href="https://www.reddit.com/posts/2022/">
            <div>Rereddit</div>
          </a>
          <a href="https://www.reddit.com/topics/a-1/">
            <div>Topics</div>
          </a>
        </div>
        <div className="right">
          <a href="https://www.redditinc.com/">
            <div>About</div>
          </a>
          <a href="https://www.redditinc.com/careers">
            <div>Career</div>
          </a>
          <a href="https://www.redditinc.com/press">
            <div>Press</div>
          </a>
          <a href="https://www.redditinc.com/advertising">
            <div>Advertise</div>
          </a>
          <a href="http://www.redditblog.com/">
            <div>Blog</div>
          </a>
          <a href="https://www.redditinc.com/policies/user-agreement">
            <div>Terms</div>
          </a>
          <a href="https://www.redditinc.com/policies/content-policy">
            <div>Content Policy</div>
          </a>
          <a href="https://www.redditinc.com/policies/privacy-policy">
            <div>Privacy Policy</div>
          </a>
          <a href="https://www.reddit.com/help/healthycommunities/">
            <div>Mod Policy</div>
          </a>
        </div>
      </div>
      <hr  style={{
          background: 'lightgrey',
          border: 'none',
          height: '1px',
        }}
        />
      <div className="rights-footer">
        Reddit Inc © 2022. All rights reserved
      </div>
    </div>
  );
}

export default Footer;
