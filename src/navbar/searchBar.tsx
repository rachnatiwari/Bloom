import * as React from "react";

function SearchBar() {
  return (
  <div className="h-9 w-full max-w-[680px] flex items-center bg-gray-100 rounded-full px-4 sm:px-5 focus-within:ring-2 focus-within:ring-pink-300">
      <input
        type="text"
        placeholder="Search Reddit"
        className="bg-transparent outline-none text-sm w-full placeholder:text-gray-500 min-w-0"
      />
    </div>
  );
}

export default SearchBar;
