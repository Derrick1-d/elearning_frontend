import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Menu, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

const Sidebar = ({ role }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuIcons = {
    Dashboard: LayoutDashboard,
    "User Management": Users,
  };

  const menuItems = {
    admin: [
      { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
      { name: "User Management", path: "/admin/users", icon: Users },
      { name: "User List", path: "/admin/users-list", icon: Users },

    ],
    professor: [
      { name: "Dashboard", path: "/professor", icon: LayoutDashboard },
    ],
    student: [
      { name: "Dashboard", path: "/student", icon: LayoutDashboard },
    ],
  };

  return (
    <div 
      className={`
        bg-gray-800 text-white h-screen transition-all duration-300 
        ${collapsed ? 'w-16' : 'w-64'}
        flex flex-col relative
      `}
    >
      {/* Collapse/Expand Button */}
      <button 
        onClick={() => setCollapsed(!collapsed)} 
        className="
          absolute top-4 right-4 z-10 
          text-white hover:bg-gray-700 
          p-2 rounded-full 
          transition duration-300
        "
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Logo or Brand */}
      <div className={`
        flex items-center justify-center 
        h-16 border-b border-gray-700
        ${collapsed ? 'px-2' : 'px-6'}
      `}>
        {!collapsed && (
          <h2 className="text-xl font-bold text-white">Admin Portal</h2>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-grow pt-6">
        <ul className="space-y-2">
          {menuItems[role]?.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`
                    flex items-center 
                    ${collapsed ? 'justify-center' : 'px-6'}
                    py-3 
                    hover:bg-gray-700 
                    transition duration-300
                    group
                  `}
                >
                  <Icon 
                    size={20} 
                    className="text-gray-300 group-hover:text-white" 
                  />
                  {!collapsed && (
                    <span className="ml-3 text-sm">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer or Additional Actions */}
      <div className={`
        border-t border-gray-700 
        ${collapsed ? 'px-2 py-4' : 'px-6 py-4'}
        text-center
      `}>
        {!collapsed && (
          <p className="text-xs text-gray-400">© 2024 Admin Portal</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;