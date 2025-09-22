// UPDATED IN: src/components/Dashboard.tsx
// Removed unnecessary imports for cleaned up Recent Appointments section
import { Users, UserCheck, Calendar, Activity, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DashboardProps {
  onNavigateToAppointments?: () => void;
}

// UPDATED IN: src/components/Dashboard.tsx
// Lightweight dashboard component with clean visual design
const Dashboard = ({ onNavigateToAppointments }: DashboardProps) => {
  // Removed unnecessary state variables for simplified component

  // UPDATED IN: src/components/Dashboard.tsx
  // Mock data for demonstration - lightweight stats only
  const stats = {
    physiotherapists: 12,
    staff: 8,
    patients: 156,
    appointmentsToday: 24
  };

  // Additional summary metrics for impressive visual display
  const summaryMetrics = [
    { 
      title: "Total Users", 
      value: "180", 
      subtitle: "Active system users",
      trend: "+12%",
      icon: Users,
      color: "text-primary"
    },
    { 
      title: "Active Sessions", 
      value: "89", 
      subtitle: "Current active users",
      trend: "+5%",
      icon: Activity,
      color: "text-success"
    },
    { 
      title: "Monthly Revenue", 
      value: "$23,450", 
      subtitle: "This month's earnings",
      trend: "+18%",
      icon: Activity,
      color: "text-info"
    },
    { 
      title: "Quick Insights", 
      value: "96%", 
      subtitle: "Patient satisfaction rate",
      trend: "+3%",
      icon: CheckCircle,
      color: "text-secondary"
    }
  ];

  // UPDATED IN: src/components/Dashboard.tsx
  // Removed appointment-related functions as Recent Appointments section is removed
  // Keeping lightweight helper functions for future maintenance

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Physiotherapy Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening at your clinic today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-border shadow-soft hover:shadow-medium hover:scale-105 transition-all duration-300 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Physiotherapists</CardTitle>
            <UserCheck className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.physiotherapists}</div>
            <p className="text-xs text-muted-foreground mt-1">Active practitioners</p>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-soft hover:shadow-medium hover:scale-105 transition-all duration-300 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Staff</CardTitle>
            <Users className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{stats.staff}</div>
            <p className="text-xs text-muted-foreground mt-1">Support staff</p>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-soft hover:shadow-medium hover:scale-105 transition-all duration-300 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
            <Activity className="h-5 w-5 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">{stats.patients}</div>
            <p className="text-xs text-muted-foreground mt-1">Registered patients</p>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-soft hover:shadow-medium hover:scale-105 transition-all duration-300 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Appointments</CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.appointmentsToday}</div>
            <p className="text-xs text-muted-foreground mt-1">Scheduled today</p>
          </CardContent>
        </Card>
      </div>

      {/* UPDATED IN: src/components/Dashboard.tsx */}
      {/* Impressive Summary Cards - Lightweight Visual Display */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground flex items-center">
            <Activity className="h-5 w-5 mr-2 text-primary" />
            System Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div
                  key={index}
                  className="p-6 border border-border rounded-lg hover:shadow-medium hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className={`h-8 w-8 ${metric.color}`} />
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      {metric.trend}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">{metric.value}</h3>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;