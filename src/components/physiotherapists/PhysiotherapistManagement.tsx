import { useState } from "react";
import { Plus, Edit, Trash2, UserCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { PhysiotherapistForm } from "./PhysiotherapistForm";

export interface Physiotherapist {
  id: string;
  name: string;
  specialization: string;
  contact: string;
  availability: string;
  status: "active" | "inactive";
}

const PhysiotherapistManagement = () => {
  const [physiotherapists, setPhysiotherapists] = useState<Physiotherapist[]>([
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

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPhysiotherapist, setEditingPhysiotherapist] = useState<Physiotherapist | null>(null);

  const handleAddPhysiotherapist = (data: Omit<Physiotherapist, 'id'>) => {
    const newPhysiotherapist: Physiotherapist = {
      ...data,
      id: Date.now().toString()
    };
    setPhysiotherapists(prev => [...prev, newPhysiotherapist]);
    setIsFormOpen(false);
  };

  const handleEditPhysiotherapist = (data: Omit<Physiotherapist, 'id'>) => {
    if (editingPhysiotherapist) {
      setPhysiotherapists(prev => prev.map(p => 
        p.id === editingPhysiotherapist.id ? { ...data, id: editingPhysiotherapist.id } : p
      ));
      setEditingPhysiotherapist(null);
      setIsFormOpen(false);
    }
  };

  const handleToggleStatus = (id: string) => {
    setPhysiotherapists(prev => prev.map(p => 
      p.id === id 
        ? { ...p, status: p.status === "active" ? "inactive" : "active" }
        : p
    ));
  };

  const handleDeletePhysiotherapist = (id: string) => {
    setPhysiotherapists(prev => prev.filter(p => p.id !== id));
  };

  const openEditForm = (physiotherapist: Physiotherapist) => {
    setEditingPhysiotherapist(physiotherapist);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingPhysiotherapist(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Physiotherapist Management</h1>
          <p className="text-muted-foreground">Manage physiotherapist profiles and schedules</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Add Physiotherapist
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {physiotherapists.map((physiotherapist) => (
          <Card key={physiotherapist.id} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{physiotherapist.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">{physiotherapist.specialization}</Badge>
                  </div>
                </div>
                <Badge className={physiotherapist.status === 'active' ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}>
                  {physiotherapist.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">Contact:</p>
                <p className="text-sm text-muted-foreground">{physiotherapist.contact}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Availability:</p>
                  <p className="text-sm text-muted-foreground">{physiotherapist.availability}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Status:</span>
                  <Switch
                    checked={physiotherapist.status === "active"}
                    onCheckedChange={() => handleToggleStatus(physiotherapist.id)}
                    className="data-[state=checked]:bg-success"
                  />
                </div>
              </div>
              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditForm(physiotherapist)}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeletePhysiotherapist(physiotherapist.id)}
                  className="flex-1 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <PhysiotherapistForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={editingPhysiotherapist ? handleEditPhysiotherapist : handleAddPhysiotherapist}
        initialData={editingPhysiotherapist}
        title={editingPhysiotherapist ? "Edit Physiotherapist" : "Add New Physiotherapist"}
      />
    </div>
  );
};

export default PhysiotherapistManagement;