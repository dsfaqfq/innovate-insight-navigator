export type UserRole = "super_admin" | "admin" | "viewer" | "user";

export interface Organisation {
  id: string;
  name: string;
  legalName: string;
  registrationNumber: string;
  countryCode: string;
  belspoUsername: string;
  belspoPassword: string;
  contactEmail: string;
  isActive: boolean;
  createdAt: string;
}

export interface OrgUser {
  id: string;
  email: string;
  role: UserRole;
  status: "active" | "invited" | "deactivated";
  invitedAt: string;
  joinedAt?: string;
}

export const mockOrganisations: Organisation[] = [
  {
    id: "org-1",
    name: "Acme Corp",
    legalName: "Acme Corporation NV",
    registrationNumber: "BE0123.456.789",
    countryCode: "BE",
    belspoUsername: "acme_belspo",
    belspoPassword: "••••••••",
    contactEmail: "admin@acmecorp.be",
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: "org-2",
    name: "TechWave",
    legalName: "TechWave Solutions BV",
    registrationNumber: "BE0987.654.321",
    countryCode: "BE",
    belspoUsername: "techwave_belspo",
    belspoPassword: "••••••••",
    contactEmail: "info@techwave.be",
    isActive: true,
    createdAt: "2024-03-22",
  },
  {
    id: "org-3",
    name: "InnoLab",
    legalName: "InnoLab Research SPRL",
    registrationNumber: "BE0456.123.789",
    countryCode: "BE",
    belspoUsername: "innolab_belspo",
    belspoPassword: "••••••••",
    contactEmail: "contact@innolab.be",
    isActive: false,
    createdAt: "2023-11-01",
  },
];

export const mockOrgUsers: OrgUser[] = [
  { id: "u-1", email: "john.doe@acmecorp.be", role: "admin", status: "active", invitedAt: "2024-01-15", joinedAt: "2024-01-16" },
  { id: "u-2", email: "jane.smith@acmecorp.be", role: "viewer", status: "active", invitedAt: "2024-02-10", joinedAt: "2024-02-11" },
  { id: "u-3", email: "bob.wilson@acmecorp.be", role: "user", status: "invited", invitedAt: "2024-04-01" },
  { id: "u-4", email: "alice.martin@acmecorp.be", role: "user", status: "active", invitedAt: "2024-03-05", joinedAt: "2024-03-06" },
];

export const roleLabels: Record<UserRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  viewer: "Viewer",
  user: "User",
};

export const roleColors: Record<UserRole, string> = {
  super_admin: "bg-primary/10 text-primary border-primary/20",
  admin: "bg-secondary/10 text-secondary border-secondary/20",
  viewer: "bg-info/10 text-info border-info/20",
  user: "bg-muted text-muted-foreground border-border",
};
