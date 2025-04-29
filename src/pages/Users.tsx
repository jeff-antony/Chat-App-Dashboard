
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, Plus, UserPlus, Filter } from "lucide-react";
import { UserRole } from "@/contexts/AuthContext";
import { toast } from "sonner";

// User status type
type UserStatus = "active" | "inactive" | "suspended";

// Mock user data for demonstration
const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin" as UserRole,
    status: "active" as UserStatus,
    lastActive: "2025-04-24T08:30:00",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    role: "user" as UserRole,
    status: "active" as UserStatus,
    lastActive: "2025-04-23T14:45:00",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "user" as UserRole,
    status: "active" as UserStatus,
    lastActive: "2025-04-23T10:22:00",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
  {
    id: "4",
    name: "Michael Chen",
    email: "michael@example.com",
    role: "user" as UserRole,
    status: "inactive" as UserStatus,
    lastActive: "2025-04-18T16:50:00",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
  },
  {
    id: "5",
    name: "Emma Garcia",
    email: "emma@example.com",
    role: "user" as UserRole,
    status: "active" as UserStatus,
    lastActive: "2025-04-24T09:15:00",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
  },
  {
    id: "6",
    name: "Alex Wong",
    email: "alex@example.com",
    role: "user" as UserRole,
    status: "suspended" as UserStatus,
    lastActive: "2025-04-10T11:30:00",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
  },
  {
    id: "7",
    name: "David Kim",
    email: "david@example.com",
    role: "user" as UserRole,
    status: "active" as UserStatus,
    lastActive: "2025-04-22T13:45:00",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
  },
];

// User interface
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
  avatar?: string;
}

const Users = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "suspended">("all");
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showEditUserDialog, setShowEditUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filter users based on search term and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // New user form state
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user" as UserRole,
    status: "active" as "active" | "inactive" | "suspended",
  });

  // Handle adding a new user
  const handleAddUser = () => {
    const userToAdd: User = {
      id: Math.random().toString(36).substring(2, 9),
      ...newUser,
      lastActive: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newUser.email}`,
    };

    setUsers((prev) => [...prev, userToAdd]);
    setShowAddUserDialog(false);
    toast.success(`User ${newUser.name} has been added`);
    
    // Reset new user form
    setNewUser({
      name: "",
      email: "",
      role: "user",
      status: "active",
    });
  };

  // Handle editing a user
  const handleEditUser = () => {
    if (!selectedUser) return;
    
    setUsers((prev) =>
      prev.map((user) => (user.id === selectedUser.id ? selectedUser : user))
    );
    
    setShowEditUserDialog(false);
    toast.success(`User ${selectedUser.name} has been updated`);
  };

  // Prepare to edit a user
  const handleEditClick = (user: User) => {
    setSelectedUser({ ...user });
    setShowEditUserDialog(true);
  };

  // Handle changing user status
  const handleStatusChange = (userId: string, status: "active" | "inactive" | "suspended") => {
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, status } : user))
    );
    
    toast.success(`User status has been updated`);
  };

  // Format date display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">
          Manage user accounts and permissions
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Users</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  className="pl-10 w-full md:w-60"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Filter Users</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <div className="p-2">
                    <p className="text-sm font-medium mb-2">Role</p>
                    <Select
                      value={roleFilter}
                      onValueChange={(val) => setRoleFilter(val as UserRole | "all")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-2">
                    <p className="text-sm font-medium mb-2">Status</p>
                    <Select
                      value={statusFilter}
                      onValueChange={(val) => 
                        setStatusFilter(val as "all" | "active" | "inactive" | "suspended")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button onClick={() => setShowAddUserDialog(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-800 border-purple-200"
                              : "bg-blue-100 text-blue-800 border-blue-200"
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            user.status === "active"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : user.status === "inactive"
                              ? "bg-gray-100 text-gray-800 border-gray-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.lastActive)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEditClick(user)}>
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(user.id, "active")}
                              disabled={user.status === "active"}
                            >
                              Set as Active
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(user.id, "inactive")}
                              disabled={user.status === "inactive"}
                            >
                              Set as Inactive
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(user.id, "suspended")}
                              disabled={user.status === "suspended"}
                              className="text-red-600"
                            >
                              Suspend User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account with the necessary permissions.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div>
              <label htmlFor="name" className="text-sm font-medium block mb-1">
                Name
              </label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="text-sm font-medium block mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="role" className="text-sm font-medium block mb-1">
                Role
              </label>
              <Select
                value={newUser.role}
                onValueChange={(val) => setNewUser({ ...newUser, role: val as UserRole })}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="status" className="text-sm font-medium block mb-1">
                Status
              </label>
              <Select
                value={newUser.status}
                onValueChange={(val) => 
                  setNewUser({ ...newUser, status: val as "active" | "inactive" | "suspended" })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddUserDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddUser} disabled={!newUser.name || !newUser.email}>
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditUserDialog} onOpenChange={setShowEditUserDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and permissions.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4 py-2">
              <div>
                <label htmlFor="edit-name" className="text-sm font-medium block mb-1">
                  Name
                </label>
                <Input
                  id="edit-name"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                />
              </div>
              
              <div>
                <label htmlFor="edit-email" className="text-sm font-medium block mb-1">
                  Email
                </label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
              </div>
              
              <div>
                <label htmlFor="edit-role" className="text-sm font-medium block mb-1">
                  Role
                </label>
                <Select
                  value={selectedUser.role}
                  onValueChange={(val) =>
                    setSelectedUser({ ...selectedUser, role: val as UserRole })
                  }
                >
                  <SelectTrigger id="edit-role">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="edit-status" className="text-sm font-medium block mb-1">
                  Status
                </label>
                <Select
                  value={selectedUser.status}
                  onValueChange={(val) =>
                    setSelectedUser({
                      ...selectedUser,
                      status: val as "active" | "inactive" | "suspended",
                    })
                  }
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEditUserDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
