import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Patient } from "./PatientManagement";

interface PatientFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Patient, 'id'>) => void;
  initialData?: Patient | null;
  title: string;
}

export const PatientForm = ({ isOpen, onClose, onSubmit, initialData, title }: PatientFormProps) => {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<Omit<Patient, 'id'>>({
    defaultValues: initialData ? {
      firstName: initialData.firstName,
      lastName: initialData.lastName,
      age: initialData.age,
      gender: initialData.gender,
      contactNumber: initialData.contactNumber,
      medicalHistory: initialData.medicalHistory
    } : {
      firstName: "",
      lastName: "",
      age: 0,
      gender: "",
      contactNumber: "",
      medicalHistory: ""
    }
  });

  const handleFormSubmit = (data: Omit<Patient, 'id'>) => {
    onSubmit(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...register("firstName", { required: "First name is required" })}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                {...register("age", { 
                  required: "Age is required",
                  min: { value: 1, message: "Age must be at least 1" },
                  max: { value: 120, message: "Age must be less than 120" }
                })}
                placeholder="Enter age"
              />
              {errors.age && (
                <p className="text-sm text-destructive">{errors.age.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                value={watch("gender")} 
                onValueChange={(value) => setValue("gender", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-destructive">{errors.gender.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              {...register("contactNumber", { 
                required: "Contact number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Contact number must be exactly 10 digits"
                }
              })}
              placeholder="Enter 10-digit contact number"
              maxLength={10}
              onKeyPress={(e) => {
                // Only allow digits
                if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
                  e.preventDefault();
                }
              }}
            />
            {errors.contactNumber && (
              <p className="text-sm text-destructive">{errors.contactNumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicalHistory">Medical History</Label>
            <Textarea
              id="medicalHistory"
              {...register("medicalHistory", { required: "Medical history is required" })}
              placeholder="Enter medical history and relevant information"
              className="min-h-[100px]"
            />
            {errors.medicalHistory && (
              <p className="text-sm text-destructive">{errors.medicalHistory.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-hover">
              {initialData ? "Update Patient" : "Add Patient"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};