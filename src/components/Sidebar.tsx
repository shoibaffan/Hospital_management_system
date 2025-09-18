import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Calendar,
  Activity,
  FileText,
  Settings as SettingsIcon,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Patients", path: "/patients", icon: Users },
    { name: "Physiotherapists", path: "/physiotherapists", icon: Activity },
    { name: "Staff", path: "/staff", icon: UserCog },
    { name: "Appointments", path: "/appointments", icon: Calendar },
    { name: "Treatments", path: "/treatments", icon: Activity },
    { name: "Reports", path: "/reports", icon: FileText },
    { name: "Settings", path: "/settings", icon: SettingsIcon },
  ];

  return (
    <div
      className={`bg-white shadow-md transition-all duration-300 border-r ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between p-3 border-b">
        <h1 className={`font-bold text-green-600 ${isOpen ? "block" : "hidden"}`}>
          PhysioHMS
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          {isOpen ? "<" : ">"}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                active
                  ? "bg-green-100 text-green-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              {isOpen && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
