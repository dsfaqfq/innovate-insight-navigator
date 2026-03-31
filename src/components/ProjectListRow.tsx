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
        className="group flex items-center gap-4 px-5 py-3 border-b border-border hover:bg-neutral-50 cursor-pointer transition-colors"
      >
        <span className="text-body font-medium text-foreground flex-1 group-hover:text-secondary transition-colors">{project.name}</span>
        <RdLevelBadge level={project.rdLevel} size="sm" />
        <StatusBadge status={project.status} />
        <span className="text-caption text-muted-foreground w-20">{project.lastUpdated}</span>
        <ChevronRight size={14} className="text-muted-foreground" />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="group flex items-start gap-5 p-4 border border-border rounded-lg bg-card shadow-card card-interactive cursor-pointer"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1.5">
          <h3 className="text-body font-semibold text-foreground group-hover:text-secondary transition-colors">{project.name}</h3>
          <StatusBadge status={project.status} />
        </div>
        <p className="text-caption text-muted-foreground mb-3 leading-relaxed">{project.description}</p>

        {showTags && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="text-micro px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <RdLevelBadge level={project.rdLevel} />
        <span className="flex items-center gap-1 text-caption text-muted-foreground">
          <FileText size={11} /> {project.documentsCount} docs
        </span>
        <span className="text-caption text-muted-foreground">{project.lastUpdated}</span>
      </div>

      {project.criteria && (
        <div className="w-32 shrink-0 flex flex-wrap gap-1 pt-1">
          {Object.keys(project.criteria).map((key) => (
            <span key={key} className="text-micro px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded-sm capitalize">{key.slice(0, 4)}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectListRow;
