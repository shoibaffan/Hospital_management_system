import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Calendar, 
  Settings, 
  Activity,
  FileText,
  ClipboardList,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "patients", label: "Patients", icon: Activity },
    { id: "physiotherapists", label: "Physiotherapists", icon: UserCheck },
    { id: "staff", label: "Staff", icon: Users },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "treatments", label: "Treatments", icon: ClipboardList },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border shadow-medium transition-transform duration-300 lg:translate-x-0",
        isCollapsed ? "-translate-x-full" : "translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">PhysioHMS</h2>
                  <p className="text-xs text-muted-foreground">Hospital Management</p>
                </div>
              </div>
              <button
                onClick={() => setIsCollapsed(true)}
                className="lg:hidden p-1 rounded-md hover:bg-accent"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsCollapsed(true); // Close mobile menu
                  }}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-soft" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent hover:shadow-medium"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Admin User</p>
                <p className="text-xs text-muted-foreground">administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsCollapsed(false)}
        className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-card border border-border rounded-lg shadow-soft"
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
};

export default Sidebar;