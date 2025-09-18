import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar, 
  Activity,
  DollarSign,
  Clock,
  Target
} from "lucide-react";

const ReportsContent = () => {
  // Mock data for charts and analytics
  const monthlyStats = [
    { month: "Jan", patients: 45, appointments: 120, revenue: 15000 },
    { month: "Feb", patients: 52, appointments: 145, revenue: 18500 },
    { month: "Mar", patients: 38, appointments: 98, revenue: 12800 },
    { month: "Apr", patients: 63, appointments: 178, revenue: 22300 },
    { month: "May", patients: 71, appointments: 195, revenue: 25600 },
    { month: "Jun", patients: 58, appointments: 167, revenue: 21200 }
  ];

  const treatmentStats = [
    { name: "Manual Therapy", count: 85, percentage: 32 },
    { name: "Ultrasound", count: 67, percentage: 25 },
    { name: "Heat Therapy", count: 54, percentage: 20 },
    { name: "Cold Therapy", count: 38, percentage: 14 },
    { name: "Electrotherapy", count: 24, percentage: 9 }
  ];

  const performanceMetrics = [
    { label: "Patient Satisfaction", value: "96%", trend: "+2.3%", positive: true },
    { label: "Treatment Success Rate", value: "89%", trend: "+5.1%", positive: true },
    { label: "Average Session Duration", value: "45 min", trend: "-3 min", positive: true },
    { label: "No-Show Rate", value: "8%", trend: "-1.2%", positive: true }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
        <p className="text-muted-foreground">Comprehensive insights into your physiotherapy clinic's performance.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-border shadow-soft hover:shadow-medium transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">$115,400</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-soft hover:shadow-medium transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Treatment Hours</CardTitle>
            <Clock className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1,247 hrs</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-soft hover:shadow-medium transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
            <Target className="h-5 w-5 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">89%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success">+5.1%</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-soft hover:shadow-medium transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Patient Growth</CardTitle>
            <TrendingUp className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">+24%</div>
            <p className="text-xs text-muted-foreground mt-1">New patients this quarter</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Monthly Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyStats.map((stat, index) => (
                <div key={stat.month} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">{stat.month}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{stat.patients} Patients</p>
                      <p className="text-xs text-muted-foreground">{stat.appointments} Appointments</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-success">${stat.revenue.toLocaleString()}</p>
                    <div className="w-16 h-2 bg-muted rounded-full mt-1">
                      <div 
                        className="h-2 bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((stat.revenue / 25600) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Treatment Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Treatment Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {treatmentStats.map((treatment) => (
                <div key={treatment.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{treatment.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{treatment.count}</span>
                      <Badge variant="secondary">{treatment.percentage}%</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${treatment.percentage * 3}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Performance Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric) => (
              <div key={metric.label} className="text-center p-4 border border-border rounded-lg">
                <h3 className="text-lg font-bold text-foreground mb-1">{metric.value}</h3>
                <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
                <Badge 
                  variant={metric.positive ? "secondary" : "destructive"}
                  className={metric.positive ? "bg-success/10 text-success border-success/20" : ""}
                >
                  {metric.trend}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsContent;