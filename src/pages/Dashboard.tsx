
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from "recharts";
import { Users, ArrowRight, MessageCircle } from "lucide-react";

// Mock data for charts
const areaChartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 900 },
  { name: "Jul", value: 1100 },
];

const barChartData = [
  { name: "Mon", users: 120, sessions: 240 },
  { name: "Tue", users: 160, sessions: 280 },
  { name: "Wed", users: 180, sessions: 300 },
  { name: "Thu", users: 190, sessions: 320 },
  { name: "Fri", users: 170, sessions: 280 },
  { name: "Sat", users: 80, sessions: 160 },
  { name: "Sun", users: 70, sessions: 140 },
];

const pieChartData = [
  { name: "Desktop", value: 400 },
  { name: "Mobile", value: 300 },
  { name: "Tablet", value: 200 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

// Stats cards data
const statsCards = [
  {
    title: "Total Users",
    value: "3,721",
    change: "+5.2%",
    timeframe: "from last month",
    icon: <Users className="h-5 w-5" />,
    positive: true,
  },
  {
    title: "Active Sessions",
    value: "2,453",
    change: "+2.7%",
    timeframe: "from last month",
    icon: <Users className="h-5 w-5" />,
    positive: true,
  },
  {
    title: "Messages",
    value: "15,342",
    change: "+12.4%",
    timeframe: "from last month",
    icon: <MessageCircle className="h-5 w-5" />,
    positive: true,
  },
  {
    title: "Avg. Response Time",
    value: "1.2s",
    change: "-0.3s",
    timeframe: "from last month",
    icon: <MessageCircle className="h-5 w-5" />,
    positive: true,
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState("weekly");

  return (
    <div className="space-y-6 fade-in">
      {/* Welcome section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your dashboard today.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2 items-center">
          <span className="text-sm text-muted-foreground">View:</span>
          <div className="flex rounded-md overflow-hidden border border-border">
            <button
              className={`px-3 py-1 text-sm ${
                timeframe === "daily"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-muted"
              }`}
              onClick={() => setTimeframe("daily")}
            >
              Daily
            </button>
            <button
              className={`px-3 py-1 text-sm ${
                timeframe === "weekly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-muted"
              }`}
              onClick={() => setTimeframe("weekly")}
            >
              Weekly
            </button>
            <button
              className={`px-3 py-1 text-sm ${
                timeframe === "monthly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-muted"
              }`}
              onClick={() => setTimeframe("monthly")}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">{card.title}</p>
                  <p className="text-3xl font-bold mt-1">{card.value}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {card.icon}
                </div>
              </div>
              <div className="mt-2">
                <span
                  className={`text-sm ${
                    card.positive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {card.change}
                </span>{" "}
                <span className="text-xs text-muted-foreground">
                  {card.timeframe}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Area chart */}
        <Card className="col-span-1">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-semibold">User Activity</CardTitle>
            <CardDescription>Active users over time</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={areaChartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    width={30}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bar chart */}
        <Card className="col-span-1">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-semibold">Weekly Overview</CardTitle>
            <CardDescription>Users vs Sessions</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barChartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    width={30}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="users"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                    name="Users"
                  />
                  <Bar
                    dataKey="sessions"
                    fill="#10B981"
                    radius={[4, 4, 0, 0]}
                    name="Sessions"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            <CardDescription>Latest user interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                      alt="User avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">
                      {["Sarah Johnson", "Michael Chen", "Alex Wong", "Emma Garcia", "David Kim"][i]}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {[
                        "Uploaded a new document",
                        "Commented on Project X",
                        "Created a new task",
                        "Updated their profile",
                        "Shared a message",
                      ][i]}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {["5 minutes", "12 minutes", "45 minutes", "1 hour", "3 hours"][i]} ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Device Distribution</CardTitle>
            <CardDescription>User device preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Link to="/dashboard/messaging">
          <Card className="hover:border-primary transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="font-medium">Open Messages</h3>
              <p className="text-sm text-muted-foreground mt-1">
                You have 5 unread messages
              </p>
              <ArrowRight className="mt-4 h-4 w-4 text-primary" />
            </CardContent>
          </Card>
        </Link>

        {user?.role === "admin" && (
          <Link to="/dashboard/users">
            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-medium">Manage Users</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  View and manage user accounts
                </p>
                <ArrowRight className="mt-4 h-4 w-4 text-primary" />
              </CardContent>
            </Card>
          </Link>
        )}

        <Link to="/dashboard/analytics">
          <Card className="hover:border-primary transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <ChartBar className="h-6 w-6" />
              </div>
              <h3 className="font-medium">View Analytics</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Detailed performance metrics
              </p>
              <ArrowRight className="mt-4 h-4 w-4 text-primary" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

// Adding missing imports
import { ChartBar } from "lucide-react";

export default Dashboard;
