import { useState } from "react";
import PwcHeader from "@/components/PwcHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SuperAdminSettings from "@/components/settings/SuperAdminSettings";
import OrganisationSettings from "@/components/settings/OrganisationSettings";
import { Building2, ShieldCheck } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("organisation");

  return (
    <div className="min-h-screen bg-background">
      <PwcHeader />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-foreground font-display tracking-tight mb-6">
          Settings
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="organisation" className="gap-2">
              <Building2 className="h-4 w-4" />
              Organisation
            </TabsTrigger>
            <TabsTrigger value="superadmin" className="gap-2">
              <ShieldCheck className="h-4 w-4" />
              Super Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="organisation">
            <OrganisationSettings />
          </TabsContent>

          <TabsContent value="superadmin">
            <SuperAdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
