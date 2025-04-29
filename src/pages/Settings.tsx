
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const Settings = () => {
  const { user } = useAuth();
  
  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings updated successfully");
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                  </div>
                  <div className="md:w-3/4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          defaultValue={user?.name}
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={user?.email}
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        className="w-full min-h-[100px] p-2 rounded-md border border-input bg-transparent"
                        placeholder="Tell us about yourself"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        defaultValue={user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                        disabled
                      />
                      <p className="text-sm text-muted-foreground">
                        Your role cannot be changed. Contact an administrator for role changes.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications on your device
                      </p>
                    </div>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via SMS
                      </p>
                    </div>
                    <Switch id="sms-notifications" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">System Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive in-app notifications
                      </p>
                    </div>
                    <Switch id="system-notifications" defaultChecked />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Notification Types</h3>
                  <div className="space-y-3 border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="message-notifications">New Messages</Label>
                      <Switch id="message-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="mention-notifications">Mentions</Label>
                      <Switch id="mention-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="update-notifications">System Updates</Label>
                      <Switch id="update-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="security-notifications">Security Alerts</Label>
                      <Switch id="security-notifications" defaultChecked />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Change Password</Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enable 2FA</h3>
                    <p className="text-sm text-muted-foreground">
                      Require a verification code when logging in
                    </p>
                  </div>
                  <Switch id="enable-2fa" />
                </div>
                <div className="pt-2">
                  <Button variant="outline" disabled>Set Up 2FA</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Session Management</CardTitle>
              <CardDescription>
                Manage your active sessions and devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Active Sessions</h3>
                  <div className="border rounded-md divide-y">
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">
                          Chrome on Windows • {new Date().toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Current
                      </Badge>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mobile App</p>
                        <p className="text-sm text-muted-foreground">
                          iPhone 13 Pro • {new Date(Date.now() - 86400000).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Logout Device
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    Logout from all devices
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer bg-background">
                      <div className="w-full h-20 rounded bg-background border"></div>
                      <p className="text-sm">Light</p>
                    </div>
                    <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer bg-zinc-950 text-white">
                      <div className="w-full h-20 rounded bg-zinc-900 border border-zinc-800"></div>
                      <p className="text-sm">Dark</p>
                    </div>
                    <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer">
                      <div className="w-full h-20 rounded bg-gradient-to-r from-gray-100 to-gray-950"></div>
                      <p className="text-sm">System</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Accent Color</h3>
                  <div className="grid grid-cols-6 gap-2">
                    {[
                      { name: "Blue", color: "#3B82F6" },
                      { name: "Green", color: "#10B981" },
                      { name: "Purple", color: "#8B5CF6" },
                      { name: "Pink", color: "#EC4899" },
                      { name: "Orange", color: "#F59E0B" },
                      { name: "Red", color: "#EF4444" },
                    ].map((item) => (
                      <button
                        key={item.name}
                        type="button"
                        className="w-10 h-10 rounded-full border p-1"
                      >
                        <span
                          className="block w-full h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Font Size</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">A</span>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      defaultValue="3"
                      className="w-full"
                    />
                    <span className="text-lg">A</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Condensed View</h3>
                      <p className="text-sm text-muted-foreground">
                        Show more content with a compact layout
                      </p>
                    </div>
                    <Switch id="condensed-view" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Adding missing imports
import { Badge } from "@/components/ui/badge";

export default Settings;
