import { X, FileText, Upload } from "lucide-react";
import type { Project } from "@/lib/mockData";
import RdLevelBadge from "./RdLevelBadge";
import StatusBadge from "./StatusBadge";

interface ProjectDetailPanelProps {
  project: Project;
  onClose: () => void;
}

const criteriaLabels: Record<string, string> = {
  novelty: "Novelty",
  uncertainty: "Uncertainty",
  creativity: "Creativity",
  systematic: "Systematic",
  transferable: "Transferable",
};

const ProjectDetailPanel = ({ project, onClose }: ProjectDetailPanelProps) => {
  return (
    <div className="fixed inset-y-0 right-0 w-[420px] bg-card border-l border-border shadow-xl z-50 flex flex-col animate-in slide-in-from-right">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">{project.name}</h2>
        <button onClick={onClose} className="p-1 hover:bg-muted rounded-sm transition-colors">
          <X size={16} className="text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <StatusBadge status={project.status} />
          <RdLevelBadge level={project.rdLevel} size="lg" />
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>

        {/* Tags */}
        <div>
          <span className="wireframe-label">Tags</span>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[11px] px-2 py-1 bg-secondary text-secondary-foreground rounded-sm">{tag}</span>
            ))}
          </div>
        </div>

        {/* Criteria */}
        <div>
          <span className="wireframe-label">Evaluation Criteria</span>
          <div className="mt-3 space-y-3">
            {Object.entries(project.criteria).map(([key, val]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-foreground">{criteriaLabels[key]}</span>
                  <span className="text-xs text-muted-foreground">{val}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${val}%` }} />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 italic">
                  AI-generated justification for {criteriaLabels[key].toLowerCase()} criterion would appear here.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div>
          <span className="wireframe-label">Documents ({project.documentsCount})</span>
          <div className="mt-2 space-y-1.5">
            {Array.from({ length: Math.min(project.documentsCount, 4) }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 bg-muted rounded-sm">
                <FileText size={13} className="text-muted-foreground" />
                <span className="text-xs text-foreground">technical_doc_{i + 1}.pdf</span>
              </div>
            ))}
            {project.documentsCount > 4 && (
              <span className="text-[11px] text-muted-foreground">+{project.documentsCount - 4} more</span>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-border flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium bg-secondary text-secondary-foreground rounded-sm hover:bg-muted transition-colors">
          <Upload size={13} /> Upload Documents
        </button>
        <button className="flex-1 px-4 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition-opacity">
          Run AI Analysis
        </button>
      </div>
    </div>
  );
};

export default ProjectDetailPanel;
