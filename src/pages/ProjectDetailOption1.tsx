import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projects } from "@/lib/mockData";
import { mockReferences } from "@/lib/mockReferences";
import type { FrascatiReference, DocumentReference } from "@/lib/mockReferences";
import PwcHeader from "@/components/PwcHeader";
import RdLevelBadge from "@/components/RdLevelBadge";
import StatusBadge from "@/components/StatusBadge";
import { ArrowLeft, FileText, Upload, BookOpen, File, X, ChevronDown, ChevronRight } from "lucide-react";

const criteriaLabels: Record<string, string> = {
  novelty: "Novelty",
  uncertainty: "Uncertainty",
  creativity: "Creativity",
  systematic: "Systematic",
  transferable: "Transferable",
};

type ActiveRef = { type: "frascati"; ref: FrascatiReference } | { type: "document"; ref: DocumentReference };

const ProjectDetailOption1 = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);
  const [activeRef, setActiveRef] = useState<ActiveRef | null>(null);
  const [expandedCriteria, setExpandedCriteria] = useState<string[]>(
    Object.keys(criteriaLabels)
  );

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

  const toggleCriterion = (key: string) => {
    setExpandedCriteria((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PwcHeader />

      {/* Wireframe label */}
      <div className="border-b border-primary/20 bg-primary/5 px-6 py-2">
        <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-primary">
          Option 1 — Inline References
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

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-foreground mb-2">{project.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <StatusBadge status={project.status} />
            <RdLevelBadge level={project.rdLevel} size="lg" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">{project.description}</p>
        </div>

        {/* R&D Level bar */}
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

        {/* Criteria with inline references */}
        {project.criteria ? (
          <div>
            <h2 className="wireframe-label mb-4">Evaluation Criteria</h2>

            {/* Legend */}
            <div className="flex items-center gap-6 mb-6 px-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                  <BookOpen size={10} /> F 2.1.3
                </span>
                <span className="text-[11px] text-muted-foreground">Frascati Manual reference</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-accent/10 text-accent border border-accent/20 bg-blue-50 text-blue-700 border-blue-200">
                  <File size={10} /> doc.pdf p.12
                </span>
                <span className="text-[11px] text-muted-foreground">User document reference</span>
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(project.criteria).map(([key, justification]) => {
                const refs = mockReferences[key];
                const isExpanded = expandedCriteria.includes(key);
                return (
                  <div key={key} className="border border-border rounded-sm bg-card overflow-hidden">
                    <button
                      onClick={() => toggleCriterion(key)}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors"
                    >
                      <h3 className="text-sm font-semibold text-foreground">{criteriaLabels[key]}</h3>
                      {isExpanded ? <ChevronDown size={14} className="text-muted-foreground" /> : <ChevronRight size={14} className="text-muted-foreground" />}
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5">
                        {/* Justification text */}
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {justification}
                        </p>

                        {/* Inline reference badges */}
                        {refs && (
                          <div className="flex flex-wrap gap-2">
                            {refs.frascati.map((fr) => (
                              <button
                                key={fr.id}
                                onClick={() => setActiveRef({ type: "frascati", ref: fr })}
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-sm text-[10px] font-semibold transition-colors cursor-pointer border ${
                                  activeRef?.type === "frascati" && activeRef.ref.id === fr.id
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                                }`}
                              >
                                <BookOpen size={10} /> {fr.paragraph}
                              </button>
                            ))}
                            {refs.documents.map((dr) => (
                              <button
                                key={dr.id}
                                onClick={() => setActiveRef({ type: "document", ref: dr })}
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-sm text-[10px] font-semibold transition-colors cursor-pointer border ${
                                  activeRef?.type === "document" && activeRef.ref.id === dr.id
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                                }`}
                              >
                                <File size={10} /> {dr.fileName.replace(".pdf", "")} p.{dr.page}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Reference preview (inline popover) */}
                        {activeRef && refs && (
                          (() => {
                            const isInThisCriterion =
                              (activeRef.type === "frascati" && refs.frascati.some(f => f.id === activeRef.ref.id)) ||
                              (activeRef.type === "document" && refs.documents.some(d => d.id === activeRef.ref.id));
                            if (!isInThisCriterion) return null;
                            return (
                              <div className={`mt-3 rounded-sm border p-4 ${
                                activeRef.type === "frascati"
                                  ? "bg-primary/5 border-primary/20"
                                  : "bg-blue-50/50 border-blue-200"
                              }`}>
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    {activeRef.type === "frascati" ? (
                                      <BookOpen size={12} className="text-primary" />
                                    ) : (
                                      <File size={12} className="text-blue-600" />
                                    )}
                                    <span className="text-xs font-semibold text-foreground">
                                      {activeRef.type === "frascati"
                                        ? (activeRef.ref as FrascatiReference).section
                                        : `${(activeRef.ref as DocumentReference).fileName} — Page ${(activeRef.ref as DocumentReference).page}`}
                                    </span>
                                  </div>
                                  <button onClick={() => setActiveRef(null)} className="p-0.5 hover:bg-muted rounded-sm">
                                    <X size={12} className="text-muted-foreground" />
                                  </button>
                                </div>
                                {activeRef.type === "document" && (activeRef.ref as DocumentReference).section && (
                                  <span className="text-[10px] text-muted-foreground block mb-1.5">
                                    Section: {(activeRef.ref as DocumentReference).section}
                                  </span>
                                )}
                                <p className="text-xs text-muted-foreground leading-relaxed italic">
                                  "{activeRef.ref.excerpt}"
                                </p>
                              </div>
                            );
                          })()
                        )}
                      </div>
                    )}
                  </div>
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
                ? "R&D evaluation criteria and references will appear here once analysis is complete."
                : "Upload documents and run AI analysis to generate R&D evaluation."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectDetailOption1;
