import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockOrganisations, mockOrgUsers, roleLabels, roleColors, type OrgUser, type UserRole } from "@/lib/settingsMockData";
import { Send, Save } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const OrganisationSettings = () => {
  const [org, setOrg] = useState(mockOrganisations[0]);
  const [users, setUsers] = useState<OrgUser[]>(mockOrgUsers);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleSaveOrg = () => {
    // TODO: persist to backend
    toast.success("Organisation details saved.");
  };

  const handleInvite = () => {
    const email = inviteEmail.trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (users.some((u) => u.email === email)) {
      toast.error("This user has already been invited.");
      return;
    }
    const newUser: OrgUser = {
      id: `u-${Date.now()}`,
      email,
      role: "user",
      status: "invited",
      invitedAt: new Date().toISOString().slice(0, 10),
    };
    setUsers((prev) => [...prev, newUser]);
    setInviteEmail("");
    toast.success(`Magic link invitation sent to ${email}`);
  };

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    toast.success("Role updated.");
  };

  return (
    <div className="space-y-6">
      {/* Organisation Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Organisation Details</CardTitle>
          <CardDescription>Update your organisation's information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input value={org.name} onChange={(e) => setOrg({ ...org, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Legal Name</Label>
              <Input value={org.legalName} onChange={(e) => setOrg({ ...org, legalName: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Registration Number</Label>
              <Input value={org.registrationNumber} onChange={(e) => setOrg({ ...org, registrationNumber: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Country Code</Label>
              <Input value={org.countryCode} onChange={(e) => setOrg({ ...org, countryCode: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>BELSPO Username</Label>
              <Input value={org.belspoUsername} onChange={(e) => setOrg({ ...org, belspoUsername: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>BELSPO Password</Label>
              <Input type="password" value={org.belspoPassword} onChange={(e) => setOrg({ ...org, belspoPassword: e.target.value })} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Contact Email</Label>
            <Input type="email" value={org.contactEmail} onChange={(e) => setOrg({ ...org, contactEmail: e.target.value })} />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSaveOrg} className="gap-2">
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">User Management</CardTitle>
          <CardDescription>Invite users by email — they'll receive a magic link to join.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Invite input */}
          <div className="flex gap-3">
            <Input
              placeholder="colleague@company.com"
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInvite()}
              className="max-w-sm"
            />
            <Button onClick={handleInvite} className="gap-2">
              <Send className="h-4 w-4" /> Send Invite
            </Button>
          </div>

          {/* Users table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Invited</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Select value={user.role} onValueChange={(val) => handleRoleChange(user.id, val as UserRole)}>
                      <SelectTrigger className="w-[140px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(roleLabels) as UserRole[]).map((role) => (
                          <SelectItem key={role} value={role}>
                            {roleLabels[role]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={user.status === "active" ? "bg-success/10 text-success border-success/20" : user.status === "invited" ? "bg-warning/10 text-warning border-warning/20" : "bg-muted text-muted-foreground"}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.invitedAt}</TableCell>
                  <TableCell className="text-muted-foreground">{user.joinedAt || "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganisationSettings;
