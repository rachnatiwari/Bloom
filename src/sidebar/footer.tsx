
import * as React from "react";

function Footer() {
  return (
    <footer className="rounded-lg bg-accent p-4 flex flex-col gap-4 shadow mt-4">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex flex-col gap-2 text-sm">
          <a href="https://www.reddithelp.com/" className="hover:underline">Help</a>
          <a href="https://www.reddit.com/coins" className="hover:underline">Reddit Coins</a>
          <a href="https://www.reddit.com/premium" className="hover:underline">Reddit Premium</a>
          <a href="https://www.reddit.com/subreddits/a-1/" className="hover:underline">Communities</a>
          <a href="https://www.reddit.com/posts/2022/" className="hover:underline">Rereddit</a>
          <a href="https://www.reddit.com/topics/a-1/" className="hover:underline">Topics</a>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <a href="https://www.redditinc.com/" className="hover:underline">About</a>
          <a href="https://www.redditinc.com/careers" className="hover:underline">Career</a>
          <a href="https://www.redditinc.com/press" className="hover:underline">Press</a>
          <a href="https://www.redditinc.com/advertising" className="hover:underline">Advertise</a>
          <a href="http://www.redditblog.com/" className="hover:underline">Blog</a>
          <a href="https://www.redditinc.com/policies/user-agreement" className="hover:underline">Terms</a>
          <a href="https://www.redditinc.com/policies/content-policy" className="hover:underline">Content Policy</a>
          <a href="https://www.redditinc.com/policies/privacy-policy" className="hover:underline">Privacy Policy</a>
          <a href="https://www.reddit.com/help/healthycommunities/" className="hover:underline">Mod Policy</a>
        </div>
      </div>
      <hr className="border-t border-gray-200" />
      <div className="text-xs text-center text-muted-foreground">
        Developed by Rachna Tiwari
      </div>
    </footer>
  );
}

export default Footer;
