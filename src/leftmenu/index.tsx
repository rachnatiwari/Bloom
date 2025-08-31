import * as React from "react";
import { Home as HomeIcon, Compass, Newspaper, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function LeftMenu() {
  const [collapsed, setCollapsed] = React.useState<boolean>(false);

  const Item = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
    <Link
      to={to}
      className={
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors"
      }
      title={label}
    >
      <Icon className="w-5 h-5" />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );

  return (
    <nav
      className={
        "fixed left-0 top-14 bottom-0 z-40 bg-white border-r border-gray-200 shadow-sm p-2 flex flex-col gap-1 overflow-y-auto"
      }
      style={{ width: collapsed ? 56 : 220 }}
    >
      <button
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand menu" : "Collapse menu"}
        className="self-end mb-1 p-1 rounded hover:bg-pink-50 text-gray-600 hover:text-pink-600"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
      <Item to="/" icon={HomeIcon} label="Home" />
      <Item to="/r/popular" icon={Compass} label="Explore" />
      <Item to="/r/technews" icon={Newspaper} label="Tech News" />
    </nav>
  );
}

export default LeftMenu;
