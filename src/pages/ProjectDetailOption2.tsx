import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projects } from "@/lib/mockData";
import { mockReferences } from "@/lib/mockReferences";
import PwcHeader from "@/components/PwcHeader";
import RdLevelBadge from "@/components/RdLevelBadge";
import StatusBadge from "@/components/StatusBadge";
import { ArrowLeft, Upload, BookOpen, File, X, ChevronRight } from "lucide-react";

const criteriaLabels: Record<string, string> = {
  novelty: "Novelty",
  uncertainty: "Uncertainty",
  creativity: "Creativity",
  systematic: "Systematic",
  transferable: "Transferable",
};

const ProjectDetailOption2 = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);
  const [selectedCriterion, setSelectedCriterion] = useState<string | null>("novelty");

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <PwcHeader />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Project not found.</p>
        </div>
      </div>
    );
  }

  const activeRefs = selectedCriterion ? mockReferences[selectedCriterion] : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PwcHeader />

      {/* Wireframe label */}
      <div className="border-b border-primary/20 bg-primary/5 px-6 py-2">
        <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-primary">
          Option 2 — Right-Side Evidence Panel
        </span>
      </div>

      <div className="border-b border-border bg-card px-6 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
          <ArrowLeft size={13} /> Back to Projects
        </button>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-secondary text-secondary-foreground rounded-sm hover:bg-muted transition-colors">
            <Upload size={13} /> Upload Documents
          </button>
          <button className="px-4 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition-opacity">
            Run AI Analysis
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main content */}
        <main className="flex-1 overflow-y-auto px-8 py-8">
          <div className="max-w-3xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-xl font-bold text-foreground mb-2">{project.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <StatusBadge status={project.status} />
                <RdLevelBadge level={project.rdLevel} size="lg" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
            </div>

            {/* R&D Level */}
            {project.rdLevel != null && (
              <div className="border border-border rounded-sm p-5 bg-card mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Overall R&D Level</span>
                  <span className="text-lg font-bold text-foreground">{project.rdLevel}%</span>
                </div>
                <div className="h-3 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${project.rdLevel}%` }} />
                </div>
              </div>
            )}

            {/* Criteria */}
            {project.criteria ? (
              <div>
                <h2 className="wireframe-label mb-4">Evaluation Criteria</h2>
                <p className="text-xs text-muted-foreground mb-6">Click on a criterion to see supporting references in the evidence panel →</p>

                <div className="space-y-3">
                  {Object.entries(project.criteria).map(([key, justification]) => {
                    const isActive = selectedCriterion === key;
                    const refs = mockReferences[key];
                    const totalRefs = refs ? refs.frascati.length + refs.documents.length : 0;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedCriterion(isActive ? null : key)}
                        className={`w-full text-left border rounded-sm p-5 transition-colors ${
                          isActive
                            ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                            : "border-border bg-card hover:border-muted-foreground/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-semibold text-foreground">{criteriaLabels[key]}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-muted-foreground">{totalRefs} refs</span>
                            <ChevronRight size={14} className={`text-muted-foreground transition-transform ${isActive ? "rotate-0 text-primary" : ""}`} />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{justification}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-border rounded-sm p-8 text-center">
                <p className="text-sm font-medium text-foreground mb-2">
                  {project.status === "analyzing" ? "Analysis in progress…" : "No analysis yet"}
                </p>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  {project.status === "analyzing"
                    ? "R&D evaluation and references will appear here once analysis is complete."
                    : "Upload documents and run AI analysis to generate R&D evaluation."}
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Evidence panel */}
        <aside className={`w-[400px] border-l border-border bg-card flex flex-col transition-all ${
          selectedCriterion && activeRefs ? "translate-x-0" : "translate-x-full hidden"
        }`}>
          {selectedCriterion && activeRefs && (
            <>
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div>
                  <span className="wireframe-label">Evidence for</span>
                  <h3 className="text-sm font-semibold text-foreground mt-0.5">{criteriaLabels[selectedCriterion]}</h3>
                </div>
                <button onClick={() => setSelectedCriterion(null)} className="p-1 hover:bg-muted rounded-sm">
                  <X size={14} className="text-muted-foreground" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {/* Frascati references */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={13} className="text-primary" />
                    <span className="text-xs font-semibold text-foreground">Frascati Manual</span>
                    <span className="text-[10px] text-muted-foreground ml-auto">{activeRefs.frascati.length} references</span>
                  </div>
                  <div className="space-y-2">
                    {activeRefs.frascati.map((fr) => (
                      <div key={fr.id} className="border border-primary/20 bg-primary/5 rounded-sm p-3">
                        <span className="text-[11px] font-semibold text-primary block mb-1">{fr.section}</span>
                        <span className="text-[10px] text-muted-foreground block mb-2">¶ {fr.paragraph}</span>
                        <p className="text-xs text-muted-foreground leading-relaxed italic">"{fr.excerpt}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Document references */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <File size={13} className="text-blue-600" />
                    <span className="text-xs font-semibold text-foreground">Project Documents</span>
                    <span className="text-[10px] text-muted-foreground ml-auto">{activeRefs.documents.length} references</span>
                  </div>
                  <div className="space-y-2">
                    {activeRefs.documents.map((dr) => (
                      <div key={dr.id} className="border border-blue-200 bg-blue-50/50 rounded-sm p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-semibold text-blue-700">{dr.fileName}</span>
                          <span className="text-[10px] text-blue-500">p. {dr.page}</span>
                        </div>
                        {dr.section && (
                          <span className="text-[10px] text-muted-foreground block mb-2">{dr.section}</span>
                        )}
                        <p className="text-xs text-muted-foreground leading-relaxed italic">"{dr.excerpt}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ProjectDetailOption2;
