import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import PatientManagement from "@/components/patients/PatientManagement";
import PhysiotherapistManagement from "@/components/physiotherapists/PhysiotherapistManagement";
import AppointmentManagement from "@/components/appointments/AppointmentManagement";
import StaffManagement from "@/components/staff/StaffManagement";
import TreatmentManagement from "@/components/treatments/TreatmentManagement";
import NotificationsPage from "@/components/notifications/NotificationsPage";
import ReportsContent from "@/components/reports/ReportsContent";
import SettingsContent from "@/components/settings/SettingsContent";

const Index = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Add search logic here based on active section
  };

  const handleViewAllNotifications = () => {
    setShowNotifications(true);
    setActiveSection("notifications");
  };

  const handleNavigateToSettings = () => {
    setActiveSection("settings");
    setShowNotifications(false);
  };

  const handleBackFromNotifications = () => {
    setShowNotifications(false);
    setActiveSection("dashboard");
  };

  const renderContent = () => {
    if (showNotifications) {
      return <NotificationsPage onBack={handleBackFromNotifications} />;
    }

    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "patients":
        return <PatientManagement />;
      case "physiotherapists":
        return <PhysiotherapistManagement />;
      case "staff":
        return <StaffManagement />;
      case "appointments":
        return <AppointmentManagement />;
      case "treatments":
        return <TreatmentManagement />;
      case "reports":
        return <ReportsContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <div className="flex-1 lg:ml-0">
        <Header 
          activeSection={activeSection}
          onLogout={handleLogout}
          onSearch={handleSearch}
          onViewAllNotifications={handleViewAllNotifications}
          onNavigateToSettings={handleNavigateToSettings}
        />
        <main className="min-h-[calc(100vh-73px)]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;