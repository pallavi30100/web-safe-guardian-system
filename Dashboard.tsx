
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Shield, AlertTriangle, BarChart3, TrendingUp, Users, Globe } from "lucide-react";

const Dashboard = () => {
  // Mock data for charts and statistics
  const scanStats = {
    totalScans: 12847,
    safeUrls: 11203,
    phishingDetected: 1644,
    accuracyRate: 99.8
  };

  const pieData = [
    { name: 'Safe URLs', value: 87.2, color: '#22c55e' },
    { name: 'Phishing', value: 12.8, color: '#ef4444' }
  ];

  const weeklyData = [
    { day: 'Mon', scans: 1840, threats: 180 },
    { day: 'Tue', scans: 2100, threats: 210 },
    { day: 'Wed', scans: 1950, threats: 195 },
    { day: 'Thu', scans: 2300, threats: 230 },
    { day: 'Fri', scans: 2680, threats: 268 },
    { day: 'Sat', scans: 1420, threats: 142 },
    { day: 'Sun', scans: 1357, threats: 136 }
  ];

  const recentScans = [
    { url: "https://suspicious-bank-login.com", status: "malicious", timestamp: "2 minutes ago", score: 89 },
    { url: "https://github.com", status: "safe", timestamp: "5 minutes ago", score: 5 },
    { url: "https://fake-paypal-verify.net", status: "malicious", timestamp: "12 minutes ago", score: 94 },
    { url: "https://google.com", status: "safe", timestamp: "18 minutes ago", score: 2 },
    { url: "https://phishing-amazon.com", status: "malicious", timestamp: "25 minutes ago", score: 91 }
  ];

  const phishingTypes = [
    { type: "Banking", count: 234, percentage: 35 },
    { type: "Social Media", count: 189, percentage: 28 },
    { type: "E-commerce", count: 145, percentage: 22 },
    { type: "Email Services", count: 76, percentage: 15 }
  ];

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Security Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor URL scanning activity and threat detection analytics
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Scan History</TabsTrigger>
            <TabsTrigger value="threats">Threat Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{scanStats.totalScans.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12.5%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Safe URLs</CardTitle>
                  <Shield className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{scanStats.safeUrls.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {((scanStats.safeUrls / scanStats.totalScans) * 100).toFixed(1)}% of total scans
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Phishing Detected</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{scanStats.phishingDetected.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {((scanStats.phishingDetected / scanStats.totalScans) * 100).toFixed(1)}% of total scans
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{scanStats.accuracyRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+0.2%</span> improvement
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Scan Results Distribution</CardTitle>
                  <CardDescription>Breakdown of safe vs malicious URLs detected</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center space-x-4 mt-4">
                    {pieData.map((entry, index) => (
                      <div key={index} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm text-muted-foreground">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7-Day Scan Activity</CardTitle>
                  <CardDescription>Daily scanning volume and threat detection</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="scans" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Total Scans"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="threats" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        name="Threats Detected"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Scan History</CardTitle>
                <CardDescription>Latest URL scans and their security status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentScans.map((scan, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium truncate max-w-md">{scan.url}</p>
                        <p className="text-sm text-muted-foreground">{scan.timestamp}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">Risk Score</p>
                          <p className="text-sm text-muted-foreground">{scan.score}%</p>
                        </div>
                        <Badge 
                          variant={scan.status === 'safe' ? 'default' : 'destructive'}
                          className="min-w-[80px] justify-center"
                        >
                          {scan.status === 'safe' ? 'Safe' : 'Malicious'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="threats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Phishing Categories</CardTitle>
                <CardDescription>Breakdown of detected phishing attempts by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {phishingTypes.map((threat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{threat.type}</span>
                        <span className="text-sm text-muted-foreground">
                          {threat.count} threats ({threat.percentage}%)
                        </span>
                      </div>
                      <Progress value={threat.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Top Targeted Domains
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['paypal.com', 'amazon.com', 'facebook.com', 'google.com', 'apple.com'].map((domain, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{domain}</span>
                        <Badge variant="outline">{Math.floor(Math.random() * 50) + 10} attempts</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Threat Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">This Week</span>
                      <span className="text-sm font-medium text-red-600">+15% increase</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">This Month</span>
                      <span className="text-sm font-medium text-green-600">-8% decrease</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Peak Hours</span>
                      <span className="text-sm font-medium">2PM - 6PM EST</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Most Active Day</span>
                      <span className="text-sm font-medium">Tuesday</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
