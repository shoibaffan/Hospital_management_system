import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

// Dashboard + Modules
import Dashboard from "./components/Dashboard";
import PatientManagement from "./components/patients/PatientManagement";
import PhysiotherapistManagement from "./components/physiotherapists/PhysiotherapistManagement";
import StaffManagement from "./components/staff/StaffManagement";
import AppointmentManagement from "./components/appointments/AppointmentManagement";
import TreatmentManagement from "./components/treatments/TreatmentManagement";

// Dummy placeholders (replace with real components later)
const Reports = () => <h2 className="p-4">Reports Module</h2>;
const Settings = () => <h2 className="p-4">Settings Module</h2>;

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          <Header />

          {/* Pages */}
          <main className="flex-1 p-4 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/patients" element={<PatientManagement />} />
              <Route path="/physiotherapists" element={<PhysiotherapistManagement />} />
              <Route path="/staff" element={<StaffManagement />} />
              <Route path="/appointments" element={<AppointmentManagement />} />
              <Route path="/treatments" element={<TreatmentManagement />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
