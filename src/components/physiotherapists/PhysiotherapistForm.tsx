import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Physiotherapist } from "./PhysiotherapistManagement";
import { useNotifications } from "@/contexts/NotificationContext";

interface PhysiotherapistFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Physiotherapist, 'id'>) => void;
  initialData?: Physiotherapist | null;
  title: string;
}

export const PhysiotherapistForm = ({ isOpen, onClose, onSubmit, initialData, title }: PhysiotherapistFormProps) => {
  const { addNotification } = useNotifications();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<Physiotherapist, 'id'>>({
    defaultValues: initialData ? {
      name: initialData.name,
      specialization: initialData.specialization,
      contact: initialData.contact,
      availability: initialData.availability
    } : {
      name: "",
      specialization: "",
      contact: "",
      availability: ""
    }
  });

  const handleFormSubmit = (data: Omit<Physiotherapist, 'id'>) => {
    onSubmit(data);
    
    // Add notification for physiotherapist management
    addNotification({
      title: initialData ? "Physiotherapist Updated" : "New Physiotherapist Added",
      message: initialData 
        ? `${data.name}'s information has been updated`
        : `${data.name} has been added as a new physiotherapist`,
      type: "success",
      section: "physiotherapists"
    });
    
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
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter full name (e.g., Dr. John Smith)"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization</Label>
            <Input
              id="specialization"
              {...register("specialization", { required: "Specialization is required" })}
              placeholder="Enter specialization (e.g., Sports Therapy, Orthopedic Rehabilitation)"
            />
            {errors.specialization && (
              <p className="text-sm text-destructive">{errors.specialization.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact Number</Label>
            <Input
              id="contact"
              {...register("contact", { 
                required: "Contact number is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Contact number must contain only numbers"
                },
                minLength: {
                  value: 10,
                  message: "Contact number must be at least 10 digits"
                },
                maxLength: {
                  value: 15,
                  message: "Contact number cannot exceed 15 digits"
                }
              })}
              placeholder="Enter contact number (numbers only)"
              type="tel"
              onInput={(e) => {
                // Only allow numbers
                const target = e.target as HTMLInputElement;
                target.value = target.value.replace(/[^0-9]/g, '');
              }}
            />
            {errors.contact && (
              <p className="text-sm text-destructive">{errors.contact.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability">Availability</Label>
            <Textarea
              id="availability"
              {...register("availability", { required: "Availability is required" })}
              placeholder="Enter availability schedule (e.g., Mon-Fri 9AM-5PM)"
              className="min-h-[80px]"
            />
            {errors.availability && (
              <p className="text-sm text-destructive">{errors.availability.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              {...register("status")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              defaultValue={initialData?.status || "active"}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-hover">
              {initialData ? "Update Physiotherapist" : "Add Physiotherapist"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};