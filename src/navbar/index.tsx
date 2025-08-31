import * as React from "react";
import SearchBar from "./searchBar";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import icon from "../images/icon.png";
import nameLogo from "../images/name.png";

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 0115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75V19.5z" />
    </svg>
  );
}
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function NavBar() {
  return (
  <nav className="w-full h-14 grid items-center px-3 md:px-4 bg-white shadow-sm gap-x-2 md:gap-x-4 [grid-template-columns:1fr_minmax(0,680px)_1fr]">
      <div className="flex items-center gap-2 flex-shrink-0 justify-self-start">
        <Link to="/">
          <img src={icon} alt="bloom" className="h-6 w-6 md:h-7 md:w-7 rounded-full object-cover" />
        </Link>
        <Link to="/">
          <img src={nameLogo} alt="bloom" className="h-6 sm:h-7 md:h-8 lg:h-9 object-contain" />
        </Link>
      </div>
      <div className="min-w-0 px-2 col-[2] w-full">
        <SearchBar />
      </div>
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 whitespace-nowrap justify-self-end">
  <Button className="h-9 px-3 text-sm border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900">Log In</Button>
  <Button className="h-9 px-3 text-sm">Sign Up</Button>
        <div className="flex items-center gap-1 ml-1 sm:ml-2">
          <UserIcon className="w-6 h-6 text-gray-400" />
          <ChevronDownIcon className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
