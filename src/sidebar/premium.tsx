
import * as React from "react";
import { Button } from "../components/button";
import premiumIcon from "../images/premium.png";

function Premium() {
  return (
    <div className="rounded-lg bg-accent p-4 flex flex-col items-center gap-4 shadow">
      <div className="flex flex-col items-center gap-2">
        <img src={premiumIcon} alt="premium icon" className="w-12 h-12 object-contain" />
        <div className="text-lg font-bold">Reddit Premium</div>
        <div className="text-sm text-muted-foreground text-center">The best Reddit experience, with monthly Coins</div>
      </div>
      <a href="https://www.reddit.com/premium" target="_blank" rel="noopener noreferrer">
  <Button className="w-full">Try Now</Button>
      </a>
    </div>
  );
}

export default Premium;
