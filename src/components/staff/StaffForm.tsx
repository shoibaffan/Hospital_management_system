import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Staff } from "./StaffManagement";

interface StaffFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Staff, 'id'>) => void;
  initialData?: Staff | null;
  title: string;
}

export const StaffForm = ({ isOpen, onClose, onSubmit, initialData, title }: StaffFormProps) => {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<Omit<Staff, 'id'>>({
    defaultValues: initialData || {
      name: "",
      role: "",
      contact: "",
      email: "",
      status: "active"
    }
  });

  const handleFormSubmit = (data: Omit<Staff, 'id'>) => {
    onSubmit(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const validatePhone = (value: string) => {
    // Allow international formats with +, -, (), spaces
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(value) || "Please enter a valid phone number";
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter full name"
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={(value) => setValue("role", value)} defaultValue={initialData?.role}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Receptionist">Receptionist</SelectItem>
                <SelectItem value="Physical Therapy Assistant">Physical Therapy Assistant</SelectItem>
                <SelectItem value="Administrative Assistant">Administrative Assistant</SelectItem>
                <SelectItem value="Nurse">Nurse</SelectItem>
                <SelectItem value="Billing Specialist">Billing Specialist</SelectItem>
                <SelectItem value="Equipment Technician">Equipment Technician</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact Number</Label>
            <Input
              id="contact"
              {...register("contact", { 
                required: "Contact number is required",
                validate: validatePhone
              })}
              placeholder="e.g., +1-555-0123 or (555) 123-4567"
            />
            {errors.contact && <p className="text-sm text-destructive">{errors.contact.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              placeholder="Enter email address"
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={(value) => setValue("status", value as "active" | "inactive")} defaultValue={initialData?.status || "active"}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-hover">
              {initialData ? "Update" : "Add"} Staff Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};