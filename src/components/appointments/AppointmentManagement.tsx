import { useState, useEffect } from "react";
import { Plus, Calendar as CalendarIcon, Clock, User, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AppointmentForm } from "./AppointmentForm";
import { Physiotherapist } from "../physiotherapists/PhysiotherapistManagement";

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  purpose: string;
  status: "confirmed" | "pending" | "cancelled";
  reason?: string;
}

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      patientName: "Sarah Johnson",
      doctorName: "Dr. Sarah Smith",
      date: "2024-01-15",
      time: "09:00 AM",
      purpose: "Lower back pain therapy",
      status: "confirmed",
      reason: ""
    },
    {
      id: "2",
      patientName: "Mike Davis", 
      doctorName: "Dr. Michael Brown",
      date: "2024-01-15",
      time: "10:30 AM",
      purpose: "Knee rehabilitation",
      status: "pending",
      reason: "Waiting for insurance approval"
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const [physiotherapists, setPhysiotherapists] = useState<Physiotherapist[]>([]);

  // Mock physiotherapists data - in real app, this would come from context/API
  useEffect(() => {
    setPhysiotherapists([
      {
        id: "1",
        name: "Dr. Sarah Smith",
        specialization: "Sports Therapy",
        contact: "+1-555-0201",
        availability: "Mon-Fri 9AM-5PM",
        status: "active"
      },
      {
        id: "2",
        name: "Dr. Michael Brown",
        specialization: "Orthopedic Rehabilitation",
        contact: "+1-555-0202",
        availability: "Tue-Sat 10AM-6PM",
        status: "active"
      }
    ]);
  }, []);

  const handleAddAppointment = (data: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...data,
      id: Date.now().toString()
    };
    setAppointments(prev => [...prev, newAppointment]);
    setIsFormOpen(false);
  };

  const handleUpdateStatus = (id: string, status: Appointment['status'], reason?: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status, reason: reason || apt.reason } : apt
    ));
  };

  const showReason = (reason: string) => {
    setSelectedReason(reason);
    setShowReasonDialog(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-success text-success-foreground">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Appointment Management</h1>
          <p className="text-muted-foreground">Manage patient appointments and schedules</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Add Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary" />
                  {appointment.patientName}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  {(appointment.status === 'pending' || appointment.status === 'cancelled') && appointment.reason && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => showReason(appointment.reason!)}
                      className="h-6 w-6 p-0"
                    >
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  )}
                  {getStatusBadge(appointment.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Doctor:</p>
                  <p className="text-sm text-muted-foreground">{appointment.doctorName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Purpose:</p>
                  <p className="text-sm text-muted-foreground">{appointment.purpose}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 pt-2 border-t border-border">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{appointment.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{appointment.time}</span>
                </div>
              </div>

              {appointment.status === 'pending' && (
                <div className="flex space-x-2 pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateStatus(appointment.id, 'confirmed')}
                    className="flex-1 text-success hover:bg-success/10"
                  >
                    Confirm
                  </Button>
                   <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateStatus(appointment.id, 'cancelled', 'Cancelled by admin')}
                    className="flex-1 text-destructive hover:bg-destructive/10"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <AppointmentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddAppointment}
        physiotherapists={physiotherapists}
      />

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

export default AppointmentManagement;