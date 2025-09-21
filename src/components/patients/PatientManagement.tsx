import { useState } from "react";
import { Plus, Edit, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PatientForm } from "./PatientForm";

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  contactNumber: string;
  medicalHistory: string;
}

const PatientManagement = () => {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "1",
      firstName: "Sarah",
      lastName: "Johnson",
      age: 32,
      gender: "Female",
      contactNumber: "+1-555-0123",
      medicalHistory: "Lower back pain, previous physiotherapy"
    },
    {
      id: "2", 
      firstName: "Mike",
      lastName: "Davis",
      age: 28,
      gender: "Male",
      contactNumber: "+1-555-0124",
      medicalHistory: "Sports injury - knee rehabilitation"
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  const handleAddPatient = (patientData: Omit<Patient, 'id'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString()
    };
    setPatients(prev => [...prev, newPatient]);
    setIsFormOpen(false);
  };

  const handleEditPatient = (patientData: Omit<Patient, 'id'>) => {
    if (editingPatient) {
      setPatients(prev => prev.map(p => 
        p.id === editingPatient.id ? { ...patientData, id: editingPatient.id } : p
      ));
      setEditingPatient(null);
      setIsFormOpen(false);
    }
  };

  const handleDeletePatient = (id: string) => {
    setPatients(prev => prev.filter(p => p.id !== id));
  };

  const openEditForm = (patient: Patient) => {
    setEditingPatient(patient);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingPatient(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Patient Management</h1>
          <p className="text-muted-foreground">Manage patient records and information</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <Card key={patient.id} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{patient.firstName} {patient.lastName}</CardTitle>
                    <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
                  </div>
                </div>
                <Badge variant="secondary">{patient.gender}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">Contact:</p>
                <p className="text-sm text-muted-foreground">{patient.contactNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Medical History:</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{patient.medicalHistory}</p>
              </div>
              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditForm(patient)}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeletePatient(patient.id)}
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

      <PatientForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={editingPatient ? handleEditPatient : handleAddPatient}
        initialData={editingPatient}
        title={editingPatient ? "Edit Patient" : "Add New Patient"}
      />
    </div>
  );
};

export default PatientManagement;