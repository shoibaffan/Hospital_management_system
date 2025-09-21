import { useState } from "react";
import { Users, UserCheck, Calendar, Activity, Clock, CheckCircle, XCircle, Info, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration
  const stats = {
    physiotherapists: 12,
    staff: 8,
    patients: 156,
    appointmentsToday: 24
  };

  const recentAppointments = [
    { 
      id: 1, 
      patient: "Sarah Johnson", 
      therapist: "Dr. Smith", 
      time: "09:00 AM", 
      status: "confirmed", 
      type: "Physical Therapy",
      reason: ""
    },
    { 
      id: 2, 
      patient: "Mike Davis", 
      therapist: "Dr. Brown", 
      time: "10:30 AM", 
      status: "confirmed", 
      type: "Sports Therapy",
      reason: ""
    },
    { 
      id: 3, 
      patient: "Emma Wilson", 
      therapist: "Dr. Taylor", 
      time: "02:00 PM", 
      status: "pending", 
      type: "Rehabilitation",
      reason: "Waiting for insurance approval"
    },
    { 
      id: 4, 
      patient: "John Anderson", 
      therapist: "Dr. Smith", 
      time: "03:30 PM", 
      status: "cancelled", 
      type: "Physical Therapy",
      reason: "Patient requested rescheduling due to work conflict"
    },
    { 
      id: 5, 
      patient: "Lisa Chen", 
      therapist: "Dr. Brown", 
      time: "04:00 PM", 
      status: "confirmed", 
      type: "Manual Therapy",
      reason: ""
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="default" className="bg-success text-success-foreground"><CheckCircle className="w-3 h-3 mr-1" />Confirmed</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-warning text-warning-foreground"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const showReason = (reason: string) => {
    setSelectedReason(reason);
    setShowReasonDialog(true);
  };

  const handleBookAgain = (appointmentId: number, patientName: string) => {
    // Updated function to handle "Book Again" functionality
    toast({
      title: "Booking Request Initiated",
      description: `Redirecting to book a new appointment for ${patientName}`,
    });
    
    // In a real implementation, you would:
    // 1. Navigate to the appointment form with pre-filled data
    // 2. Or open a booking modal with patient information
    // 3. Update the appointment status in the backend
    
    console.log(`Book again clicked for appointment ${appointmentId}, patient: ${patientName}`);
  };

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

      {/* Recent Appointments */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            Recent Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-medium text-foreground">{appointment.patient}</h4>
                      <p className="text-sm text-muted-foreground">with {appointment.therapist}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{appointment.time}</p>
                    <p className="text-xs text-muted-foreground">{appointment.type}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {(appointment.status === 'pending' || appointment.status === 'cancelled') && appointment.reason && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => showReason(appointment.reason)}
                        className="h-6 w-6 p-0"
                      >
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    )}
                    {(appointment.status === 'pending' || appointment.status === 'cancelled') && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBookAgain(appointment.id, appointment.patient)}
                        className="h-8 px-3 text-xs"
                      >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Book Again
                      </Button>
                    )}
                    {getStatusBadge(appointment.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showReasonDialog} onOpenChange={setShowReasonDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Status Reason</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">{selectedReason}</p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowReasonDialog(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;