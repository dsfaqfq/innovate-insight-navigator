import { useParams, useNavigate, Link } from "react-router-dom";
import { projects } from "@/lib/mockData";
import PwcHeader from "@/components/PwcHeader";
import RdLevelBadge from "@/components/RdLevelBadge";
import StatusBadge from "@/components/StatusBadge";
import { ArrowLeft, FileText, Upload, Eye } from "lucide-react";

const criteriaLabels: Record<string, string> = {
  novelty: "Novelty",
  uncertainty: "Uncertainty",
  creativity: "Creativity",
  systematic: "Systematic",
  transferable: "Transferable",
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PwcHeader />

      <div className="border-b border-border bg-card px-6 py-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
        >
          <ArrowLeft size={13} /> Back to Projects
        </button>
      </div>

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold text-foreground mb-2">{project.name}</h1>
            <div className="flex items-center gap-3">
              <StatusBadge status={project.status} />
              <RdLevelBadge level={project.rdLevel} size="lg" />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-secondary text-secondary-foreground rounded-sm hover:bg-muted transition-colors">
              <Upload size={13} /> Upload Documents
            </button>
            <button className="px-4 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition-opacity">
              Run AI Analysis
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left column — description + criteria */}
          <div className="col-span-2 space-y-8">
            <div>
              <h2 className="wireframe-label mb-2">Description</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
            </div>

            {/* R&D Level — only if available */}
            {project.rdLevel != null && (
              <div className="border border-border rounded-sm p-5 bg-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Overall R&D Level</span>
                  <span className="text-lg font-bold text-foreground">{project.rdLevel}%</span>
                </div>
                <div className="h-3 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${project.rdLevel}%` }} />
                </div>
              </div>
            )}

            {/* Criteria — only if available */}
            {project.criteria ? (
              <div>
                <h2 className="wireframe-label mb-4">Evaluation Criteria</h2>
                <div className="space-y-4">
                  {Object.entries(project.criteria).map(([key, justification]) => (
                    <div key={key} className="border border-border rounded-sm p-5 bg-card">
                      <h3 className="text-sm font-semibold text-foreground mb-2">{criteriaLabels[key]}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {justification}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-border rounded-sm p-8 text-center">
                <p className="text-sm font-medium text-foreground mb-2">
                  {project.status === "analyzing" ? "Analysis in progress…" : "No analysis yet"}
                </p>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  {project.status === "analyzing"
                    ? "The AI is currently evaluating this project. R&D score and criteria justifications will appear here once the analysis is complete."
                    : "Upload technical documents and run an AI analysis to generate the R&D evaluation score and criteria justifications."}
                </p>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="border border-border rounded-sm p-4 bg-card">
              <h3 className="wireframe-label mb-3">Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[11px] px-2 py-1 bg-secondary text-secondary-foreground rounded-sm">{tag}</span>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="border border-border rounded-sm p-4 bg-card">
              <h3 className="wireframe-label mb-3">Project Info</h3>
              <dl className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Program</dt>
                  <dd className="font-medium text-foreground">{project.program}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Status</dt>
                  <dd className="font-medium text-foreground capitalize">{project.status.replace("-", " ")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">R&D Level</dt>
                  <dd className="font-medium text-foreground">{project.rdLevel}%</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Documents</dt>
                  <dd className="font-medium text-foreground">{project.documentsCount}</dd>
                </div>
              </dl>
            </div>

            {/* Documents */}
            <div className="border border-border rounded-sm p-4 bg-card">
              <h3 className="wireframe-label mb-3">Documents ({project.documentsCount})</h3>
              <div className="space-y-1.5">
                {Array.from({ length: Math.min(project.documentsCount, 5) }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 bg-muted rounded-sm">
                    <FileText size={13} className="text-muted-foreground" />
                    <span className="text-xs text-foreground">technical_doc_{i + 1}.pdf</span>
                  </div>
                ))}
                {project.documentsCount > 5 && (
                  <span className="text-[11px] text-muted-foreground">+{project.documentsCount - 5} more</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
