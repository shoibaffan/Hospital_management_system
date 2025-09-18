import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Moon, 
  Sun, 
  Bell, 
  Globe, 
  Shield, 
  Database,
  Mail,
  Phone,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SettingsContent = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    appointments: true,
    patients: true,
    treatments: false,
    system: true
  });
  const [clinicInfo, setClinicInfo] = useState({
    name: "PhysioHMS Clinic",
    email: "admin@physiohms.com",
    phone: "+1 (555) 123-4567",
    address: "123 Health Street, Medical District, City 12345",
    workingHours: "9:00 AM - 6:00 PM",
    timezone: "UTC-5"
  });
  
  const { toast } = useToast();

  useEffect(() => {
    // Check current theme on component mount
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast({
      title: "Theme Updated",
      description: `Switched to ${newMode ? 'dark' : 'light'} mode`,
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Notification Settings Updated",
      description: `${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handleClinicInfoSave = () => {
    toast({
      title: "Clinic Information Updated",
      description: "Your clinic information has been saved successfully.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your application preferences and clinic information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <span>Appearance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark themes
                </p>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">Language & Region</Label>
              <Select defaultValue="en-us">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-us">English (US)</SelectItem>
                  <SelectItem value="en-gb">English (UK)</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-base">Timezone</Label>
              <Select defaultValue="utc-5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc-5">UTC-5 (Eastern Time)</SelectItem>
                  <SelectItem value="utc-6">UTC-6 (Central Time)</SelectItem>
                  <SelectItem value="utc-7">UTC-7 (Mountain Time)</SelectItem>
                  <SelectItem value="utc-8">UTC-8 (Pacific Time)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Appointment Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts for new appointments
                </p>
              </div>
              <Switch
                checked={notifications.appointments}
                onCheckedChange={(value) => handleNotificationChange('appointments', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Patient Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about patient updates
                </p>
              </div>
              <Switch
                checked={notifications.patients}
                onCheckedChange={(value) => handleNotificationChange('patients', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Treatment Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Alerts for treatment completions
                </p>
              </div>
              <Switch
                checked={notifications.treatments}
                onCheckedChange={(value) => handleNotificationChange('treatments', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">System Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Important system updates and alerts
                </p>
              </div>
              <Switch
                checked={notifications.system}
                onCheckedChange={(value) => handleNotificationChange('system', value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clinic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Clinic Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="clinicName">Clinic Name</Label>
              <Input
                id="clinicName"
                value={clinicInfo.name}
                onChange={(e) => setClinicInfo(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clinicEmail">Email</Label>
              <Input
                id="clinicEmail"
                type="email"
                value={clinicInfo.email}
                onChange={(e) => setClinicInfo(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clinicPhone">Phone</Label>
              <Input
                id="clinicPhone"
                value={clinicInfo.phone}
                onChange={(e) => setClinicInfo(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workingHours">Working Hours</Label>
              <Input
                id="workingHours"
                value={clinicInfo.workingHours}
                onChange={(e) => setClinicInfo(prev => ({ ...prev, workingHours: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clinicAddress">Address</Label>
            <Textarea
              id="clinicAddress"
              value={clinicInfo.address}
              onChange={(e) => setClinicInfo(prev => ({ ...prev, address: e.target.value }))}
              className="min-h-[80px]"
            />
          </div>

          <Button onClick={handleClinicInfoSave} className="bg-primary hover:bg-primary-hover">
            Save Clinic Information
          </Button>
        </CardContent>
      </Card>

      {/* Security & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Security & Privacy</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <h3 className="font-medium">Change Password</h3>
                <p className="text-sm text-muted-foreground">Update your account password</p>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <h3 className="font-medium">Data Export</h3>
                <p className="text-sm text-muted-foreground">Download your clinic data</p>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <h3 className="font-medium">Privacy Settings</h3>
                <p className="text-sm text-muted-foreground">Manage data privacy options</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsContent;