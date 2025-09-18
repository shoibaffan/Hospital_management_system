import { useState } from "react";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { StaffForm } from "./StaffForm";

export interface Staff {
  id: string;
  name: string;
  role: string;
  contact: string;
  email: string;
  status: "active" | "inactive";
}

const StaffManagement = () => {
  const [staff, setStaff] = useState<Staff[]>([
    {
      id: "1",
      name: "Jennifer Wilson",
      role: "Receptionist",
      contact: "+1-555-0301",
      email: "jennifer@physio.com",
      status: "active"
    },
    {
      id: "2",
      name: "Robert Johnson",
      role: "Physical Therapy Assistant",
      contact: "+1-555-0302",
      email: "robert@physio.com", 
      status: "active"
    },
    {
      id: "3",
      name: "Maria Garcia",
      role: "Administrative Assistant",
      contact: "+1-555-0303",
      email: "maria@physio.com",
      status: "inactive"
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  const handleAddStaff = (data: Omit<Staff, 'id'>) => {
    const newStaff: Staff = {
      ...data,
      id: Date.now().toString()
    };
    setStaff(prev => [...prev, newStaff]);
    setIsFormOpen(false);
  };

  const handleEditStaff = (data: Omit<Staff, 'id'>) => {
    if (editingStaff) {
      setStaff(prev => prev.map(s => 
        s.id === editingStaff.id ? { ...data, id: editingStaff.id } : s
      ));
      setEditingStaff(null);
      setIsFormOpen(false);
    }
  };

  const openEditForm = (staff: Staff) => {
    setEditingStaff(staff);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingStaff(null);
  };

  const handleToggleStatus = (id: string) => {
    setStaff(prev => prev.map(member => 
      member.id === id 
        ? { ...member, status: member.status === "active" ? "inactive" : "active" }
        : member
    ));
  };

  const handleDeleteStaff = (id: string) => {
    setStaff(prev => prev.filter(member => member.id !== id));
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge className="bg-success text-success-foreground">Active</Badge>
      : <Badge variant="secondary" className="bg-muted text-muted-foreground">Inactive</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Staff Management</h1>
          <p className="text-muted-foreground">Manage staff members and their status</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => (
          <Card key={member.id} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-info/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-info" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                {getStatusBadge(member.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">Contact:</p>
                <p className="text-sm text-muted-foreground">{member.contact}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Email:</p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Status:</span>
                  <Switch
                    checked={member.status === "active"}
                    onCheckedChange={() => handleToggleStatus(member.id)}
                    className="data-[state=checked]:bg-success"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditForm(member)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteStaff(member.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <StaffForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={editingStaff ? handleEditStaff : handleAddStaff}
        initialData={editingStaff}
        title={editingStaff ? "Edit Staff Member" : "Add New Staff Member"}
      />
    </div>
  );
};

export default StaffManagement;