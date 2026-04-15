import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mockOrganisations, type Organisation } from "@/lib/settingsMockData";
import { Plus, Power, PowerOff } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const SuperAdminSettings = () => {
  const [organisations, setOrganisations] = useState<Organisation[]>(mockOrganisations);
  const [createOpen, setCreateOpen] = useState(false);
  const [newOrg, setNewOrg] = useState({ name: "", legalName: "", registrationNumber: "", countryCode: "BE", contactEmail: "" });

  const handleCreate = () => {
    if (!newOrg.name || !newOrg.legalName || !newOrg.contactEmail) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const org: Organisation = {
      id: `org-${Date.now()}`,
      ...newOrg,
      belspoUsername: "",
      belspoPassword: "",
      isActive: true,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setOrganisations((prev) => [...prev, org]);
    setNewOrg({ name: "", legalName: "", registrationNumber: "", countryCode: "BE", contactEmail: "" });
    setCreateOpen(false);
    toast.success(`Organisation "${org.name}" created.`);
  };

  const toggleActive = (id: string) => {
    setOrganisations((prev) =>
      prev.map((o) => (o.id === id ? { ...o, isActive: !o.isActive } : o))
    );
    const org = organisations.find((o) => o.id === id);
    if (org) {
      toast.success(`${org.name} ${org.isActive ? "deactivated" : "activated"}.`);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Organisation Management</CardTitle>
            <CardDescription>Create and manage organisations across the platform.</CardDescription>
          </div>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" /> New Organisation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Organisation</DialogTitle>
                <DialogDescription>Add a new organisation to the platform.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-1.5">
                  <Label>Name *</Label>
                  <Input value={newOrg.name} onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })} placeholder="Acme Corp" />
                </div>
                <div className="space-y-1.5">
                  <Label>Legal Name *</Label>
                  <Input value={newOrg.legalName} onChange={(e) => setNewOrg({ ...newOrg, legalName: e.target.value })} placeholder="Acme Corporation NV" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Registration Number</Label>
                    <Input value={newOrg.registrationNumber} onChange={(e) => setNewOrg({ ...newOrg, registrationNumber: e.target.value })} placeholder="BE0123.456.789" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Country Code</Label>
                    <Input value={newOrg.countryCode} onChange={(e) => setNewOrg({ ...newOrg, countryCode: e.target.value })} placeholder="BE" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Contact Email *</Label>
                  <Input type="email" value={newOrg.contactEmail} onChange={(e) => setNewOrg({ ...newOrg, contactEmail: e.target.value })} placeholder="admin@acme.be" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
                <Button onClick={handleCreate}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organisation</TableHead>
                <TableHead>Registration</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organisations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>
                    <div>
                      <span className="font-medium text-foreground">{org.name}</span>
                      <p className="text-xs text-muted-foreground">{org.legalName}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{org.registrationNumber || "—"}</TableCell>
                  <TableCell>{org.countryCode}</TableCell>
                  <TableCell className="text-muted-foreground">{org.contactEmail}</TableCell>
                  <TableCell>
                    <Badge variant={org.isActive ? "default" : "secondary"} className={org.isActive ? "bg-success/10 text-success border border-success/20" : "bg-destructive/10 text-destructive border border-destructive/20"}>
                      {org.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => toggleActive(org.id)} title={org.isActive ? "Deactivate" : "Activate"}>
                      {org.isActive ? <PowerOff className="h-4 w-4 text-destructive" /> : <Power className="h-4 w-4 text-success" />}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminSettings;
