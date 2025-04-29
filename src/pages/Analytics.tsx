
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data
const performanceData = [
  { name: "Jan", pageLoad: 2.5, apiResponse: 0.8, renderTime: 1.2 },
  { name: "Feb", pageLoad: 2.3, apiResponse: 0.7, renderTime: 1.1 },
  { name: "Mar", pageLoad: 2.1, apiResponse: 0.6, renderTime: 1.0 },
  { name: "Apr", pageLoad: 2.8, apiResponse: 0.9, renderTime: 1.3 },
  { name: "May", pageLoad: 2.2, apiResponse: 0.7, renderTime: 1.1 },
  { name: "Jun", pageLoad: 2.0, apiResponse: 0.5, renderTime: 0.9 },
  { name: "Jul", pageLoad: 1.9, apiResponse: 0.5, renderTime: 0.8 },
  { name: "Aug", pageLoad: 1.7, apiResponse: 0.4, renderTime: 0.7 },
];

const usageData = [
  { name: "Mon", activeUsers: 1200, sessions: 1800, pageViews: 7500 },
  { name: "Tue", activeUsers: 1400, sessions: 2100, pageViews: 8200 },
  { name: "Wed", activeUsers: 1500, sessions: 2400, pageViews: 9100 },
  { name: "Thu", activeUsers: 1300, sessions: 2000, pageViews: 8000 },
  { name: "Fri", activeUsers: 1450, sessions: 2200, pageViews: 8500 },
  { name: "Sat", activeUsers: 950, sessions: 1500, pageViews: 6200 },
  { name: "Sun", activeUsers: 850, sessions: 1300, pageViews: 5800 },
];

const browserData = [
  { name: "Chrome", value: 58 },
  { name: "Firefox", value: 17 },
  { name: "Safari", value: 13 },
  { name: "Edge", value: 8 },
  { name: "Others", value: 4 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

const Analytics = () => {
  const [performanceTimeframe, setPerformanceTimeframe] = useState("monthly");
  const [usageTimeframe, setUsageTimeframe] = useState("weekly");

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Analyze performance metrics and user behavior
        </p>
      </div>
      
      <Tabs defaultValue="performance" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="performance" className="space-y-6">
          {/* Performance overview */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>
                    Page load times and API response times
                  </CardDescription>
                </div>
                <div className="flex rounded-md overflow-hidden border border-border">
                  <button
                    className={`px-3 py-1 text-sm ${
                      performanceTimeframe === "daily"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-muted"
                    }`}
                    onClick={() => setPerformanceTimeframe("daily")}
                  >
                    Daily
                  </button>
                  <button
                    className={`px-3 py-1 text-sm ${
                      performanceTimeframe === "weekly"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-muted"
                    }`}
                    onClick={() => setPerformanceTimeframe("weekly")}
                  >
                    Weekly
                  </button>
                  <button
                    className={`px-3 py-1 text-sm ${
                      performanceTimeframe === "monthly"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-muted"
                    }`}
                    onClick={() => setPerformanceTimeframe("monthly")}
                  >
                    Monthly
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      yAxisId="left"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      label={{
                        value: "Time (seconds)",
                        angle: -90,
                        position: "insideLeft",
                        style: { textAnchor: "middle", fontSize: 12 },
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="pageLoad"
                      name="Page Load"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="apiResponse"
                      name="API Response"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="renderTime"
                      name="Render Time"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                <p>
                  <span className="font-medium">Analysis:</span> Overall
                  performance has improved by 23% over the past 3 months with
                  page load time decreasing from 2.5s to 1.7s.
                </p>
              </div>
            </CardFooter>
          </Card>
          
          {/* Performance stats */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Page Load
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold">1.7s</span>
                  <span className="text-sm font-medium text-green-500">-15%</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  API Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold">0.4s</span>
                  <span className="text-sm font-medium text-green-500">-20%</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Time to Interactive
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold">0.7s</span>
                  <span className="text-sm font-medium text-green-500">-12%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="usage" className="space-y-6">
          {/* Usage overview */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Usage Metrics</CardTitle>
                  <CardDescription>
                    Active users, sessions, and page views
                  </CardDescription>
                </div>
                <div className="flex rounded-md overflow-hidden border border-border">
                  <button
                    className={`px-3 py-1 text-sm ${
                      usageTimeframe === "daily"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-muted"
                    }`}
                    onClick={() => setUsageTimeframe("daily")}
                  >
                    Daily
                  </button>
                  <button
                    className={`px-3 py-1 text-sm ${
                      usageTimeframe === "weekly"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-muted"
                    }`}
                    onClick={() => setUsageTimeframe("weekly")}
                  >
                    Weekly
                  </button>
                  <button
                    className={`px-3 py-1 text-sm ${
                      usageTimeframe === "monthly"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-muted"
                    }`}
                    onClick={() => setUsageTimeframe("monthly")}
                  >
                    Monthly
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={usageData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="activeUsers"
                      name="Active Users"
                      fill="#3B82F6"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="sessions"
                      name="Sessions"
                      fill="#10B981"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="pageViews"
                      name="Page Views"
                      fill="#F59E0B"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                <p>
                  <span className="font-medium">Analysis:</span> Wednesday shows
                  the highest user activity with 1,500 active users and 9,100 page
                  views. Weekend activity drops by approximately 40%.
                </p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="demographics" className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {/* Browser distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Browser Usage</CardTitle>
              <CardDescription>Distribution of user browsers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={browserData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {browserData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Geographic distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>User locations by country</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { country: "United States", value: 42, color: "#3B82F6" },
                  { country: "United Kingdom", value: 15, color: "#10B981" },
                  { country: "Germany", value: 12, color: "#F59E0B" },
                  { country: "Canada", value: 8, color: "#EF4444" },
                  { country: "Australia", value: 6, color: "#8B5CF6" },
                  { country: "Others", value: 17, color: "#6B7280" },
                ].map((item) => (
                  <div key={item.country}>
                    <div className="flex justify-between mb-1">
                      <span>{item.country}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Device distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Device Type</CardTitle>
              <CardDescription>Distribution of user devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Mobile", value: 48 },
                        { name: "Desktop", value: 42 },
                        { name: "Tablet", value: 10 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="#3B82F6" />
                      <Cell fill="#10B981" />
                      <Cell fill="#F59E0B" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* User engagement */}
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>Time spent on platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "< 1 minute", value: 15, color: "#EF4444" },
                  { label: "1-5 minutes", value: 28, color: "#F59E0B" },
                  { label: "5-10 minutes", value: 32, color: "#10B981" },
                  { label: "10-30 minutes", value: 18, color: "#3B82F6" },
                  { label: "> 30 minutes", value: 7, color: "#8B5CF6" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
