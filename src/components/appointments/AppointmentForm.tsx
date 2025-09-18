import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Appointment } from "./AppointmentManagement";

interface Physiotherapist {
  id: string;
  name: string;
  specialization: string;
  contact: string;
  availability: string;
  status: "active" | "inactive";
}

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Appointment, 'id'>) => void;
  physiotherapists?: Physiotherapist[];
}

// Mock patients data
const patients = [
  { id: "1", name: "Sarah Johnson" },
  { id: "2", name: "Mike Davis" },
  { id: "3", name: "Emma Wilson" },
  { id: "4", name: "John Anderson" },
  { id: "5", name: "Lisa Chen" }
];

// Mock doctors data
const doctors = [
  "Dr. Sarah Smith",
  "Dr. Michael Brown", 
  "Dr. Jennifer Taylor",
  "Dr. Robert Wilson"
];

export const AppointmentForm = ({ isOpen, onClose, onSubmit, physiotherapists = [] }: AppointmentFormProps) => {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<Omit<Appointment, 'id'>>({
    defaultValues: {
      patientName: "",
      doctorName: "",
      date: "",
      time: "",
      purpose: "",
      status: "pending",
      reason: ""
    }
  });

  // Filter only active physiotherapists
  const activePhysiotherapists = physiotherapists.filter(p => p.status === "active");

  const handleFormSubmit = (data: Omit<Appointment, 'id'>) => {
    onSubmit(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const validateDateTime = (date: string, time: string) => {
    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    return selectedDateTime > now;
  };

  const validateDate = (value: string) => {
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today || "Please select today or a future date";
  };

  const validateTime = (value: string) => {
    const date = watch("date");
    if (!date) return true;
    
    const selectedDate = new Date(date);
    const today = new Date();
    
    // If it's today, check time
    if (selectedDate.toDateString() === today.toDateString()) {
      const [hours, minutes] = value.split(':');
      const selectedTime = new Date();
      selectedTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      return selectedTime > new Date() || "Please select a future time for today";
    }
    
    return true;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule New Appointment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patientName">Patient Name</Label>
            <Select onValueChange={(value) => setValue("patientName", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.name}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.patientName && <p className="text-sm text-destructive">{errors.patientName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              {...register("date", { 
                required: "Date is required",
                validate: validateDate
              })}
            />
            {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              {...register("time", { 
                required: "Time is required",
                validate: validateTime
              })}
            />
            {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctorName">Doctor/Physiotherapist</Label>
            <Select onValueChange={(value) => setValue("doctorName", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select doctor or physiotherapist" />
              </SelectTrigger>
              <SelectContent>
                {activePhysiotherapists.map((physiotherapist) => (
                  <SelectItem key={physiotherapist.id} value={physiotherapist.name}>
                    {physiotherapist.name} - {physiotherapist.specialization}
                  </SelectItem>
                ))}
                {doctors.map((doctor) => (
                  <SelectItem key={doctor} value={doctor}>
                    {doctor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.doctorName && <p className="text-sm text-destructive">{errors.doctorName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Textarea
              id="purpose"
              {...register("purpose", { required: "Purpose is required" })}
              placeholder="Enter the purpose of the appointment"
              className="min-h-[80px]"
            />
            {errors.purpose && <p className="text-sm text-destructive">{errors.purpose.message}</p>}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-hover">
              Schedule Appointment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};