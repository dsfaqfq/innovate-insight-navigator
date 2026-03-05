import { FileText, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/mockData";
import RdLevelBadge from "./RdLevelBadge";
import StatusBadge from "./StatusBadge";

interface ProjectListRowProps {
  project: Project;
  showTags?: boolean;
  compact?: boolean;
  onClick?: () => void;
}

const ProjectListRow = ({ project, showTags, compact, onClick }: ProjectListRowProps) => {
  if (compact) {
    return (
      <div
        onClick={onClick}
        className="group flex items-center gap-4 px-4 py-2.5 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors"
      >
        <span className="text-sm font-medium text-foreground flex-1 group-hover:text-primary transition-colors">{project.name}</span>
        <RdLevelBadge level={project.rdLevel} size="sm" />
        <StatusBadge status={project.status} />
        <span className="text-[11px] text-muted-foreground w-20">{project.lastUpdated}</span>
        <ChevronRight size={14} className="text-muted-foreground" />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="group flex items-start gap-5 p-5 border border-border rounded-sm bg-card hover:border-primary/40 hover:shadow-sm cursor-pointer transition-all"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1.5">
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
          <StatusBadge status={project.status} />
        </div>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{project.description}</p>

        {showTags && (
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 bg-secondary text-secondary-foreground rounded-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <RdLevelBadge level={project.rdLevel} />
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <FileText size={11} /> {project.documentsCount} docs
        </span>
        <span className="text-[11px] text-muted-foreground">{project.lastUpdated}</span>
      </div>

      {/* Criteria bars */}
      <div className="w-32 shrink-0 space-y-1.5 pt-1">
        {Object.entries(project.criteria).map(([key, val]) => (
          <div key={key} className="flex items-center gap-2">
            <span className="text-[9px] text-muted-foreground w-10 capitalize">{key.slice(0, 4)}</span>
            <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
              <div className="h-full bg-primary/60 rounded-full" style={{ width: `${val}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectListRow;
