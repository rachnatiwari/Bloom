import * as React from "react";
import { FireIcon, ArrowTrendingUpIcon, ArrowUpOnSquareIcon, SparklesIcon } from "@heroicons/react/24/outline";

export type PostSort = "hot" | "new" | "top" | "rising";

type Props = {
  active: PostSort;
  onChange: (next: PostSort) => void;
};

function NavBar({ active, onChange }: Props) {
  const item = (Icon: any, label: string, id: PostSort) => {
    const isActive = active === id;
    return (
      <button
        id={id}
        onClick={() => onChange(id)}
        className={
          "flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors " +
          (isActive ? "text-pink-600 font-semibold" : "text-gray-700 hover:text-pink-600")
        }
      >
        <Icon className="w-4 h-4" /> {label}
      </button>
    );
  };

  return (
    <div className="flex items-center gap-2">
      {item(FireIcon, "Hot", "hot")}
      {item(SparklesIcon, "New", "new")}
      {item(ArrowUpOnSquareIcon, "Top", "top")}
      {item(ArrowTrendingUpIcon, "Rising", "rising")}
    </div>
  );
}

export default NavBar;
