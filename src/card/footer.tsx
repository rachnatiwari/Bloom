

import * as React from "react";
import { MessageSquare, Share2, MoreHorizontal, Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";


interface FooterProps {
  saved?: boolean;
  comments: number;
}

const Footer: React.FC<FooterProps> = (props) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  function toggleShowMoreOption() {
    setShowMoreOptions(!showMoreOptions);
  }

  return (
    <div className="flex items-center text-sm text-gray-500 gap-6 mt-2">
      <button className="flex items-center gap-2 hover:text-gray-700" aria-label="Comments">
        <MessageSquare className="h-4 w-4" />
        <span>{props.comments > 1000 ? (props.comments / 1000).toFixed(1) + "k" : props.comments} Comments</span>
      </button>
      <button className="flex items-center gap-2 hover:text-gray-700" aria-label="Share">
        <Share2 className="h-4 w-4" />
        <span>Share</span>
      </button>
      <button className="flex items-center gap-2 hover:text-gray-700" aria-label="Save">
        {props.saved ? (
          <BookmarkCheck className="h-4 w-4" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
        <span>Save</span>
      </button>
      <button
        className="flex items-center hover:text-gray-700"
        aria-label="More options"
        onMouseDown={toggleShowMoreOption}
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>
      {showMoreOptions && (
        <div className="relative">
          <div className="absolute left-0 mt-2 w-24 bg-white border border-gray-200 rounded shadow-lg z-10">
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Hide</div>
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Report</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
