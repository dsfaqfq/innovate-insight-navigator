import { FileText } from "lucide-react";
import type { Project } from "@/lib/mockData";
import RdLevelBadge from "./RdLevelBadge";
import StatusBadge from "./StatusBadge";

interface ProjectTileCardProps {
  project: Project;
  showTags?: boolean;
  onClick?: () => void;
}

const ProjectTileCard = ({ project, showTags, onClick }: ProjectTileCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group bg-card border border-border rounded-sm p-5 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <StatusBadge status={project.status} />
        <RdLevelBadge level={project.rdLevel} />
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
        {project.name}
      </h3>
      <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{project.description}</p>

      {/* Mini criteria bar */}
      <div className="grid grid-cols-5 gap-1 mb-4">
        {Object.entries(project.criteria).map(([key, val]) => (
          <div key={key} className="text-center">
            <div className="h-1 rounded-full bg-secondary overflow-hidden">
              <div className="h-full bg-primary/60 rounded-full" style={{ width: `${val}%` }} />
            </div>
            <span className="text-[8px] text-muted-foreground mt-0.5 block capitalize">{key.slice(0, 3)}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1"><FileText size={11} /> {project.documentsCount} docs</span>
        <span>{project.lastUpdated}</span>
      </div>

      {showTags && (
        <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-border">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded-sm">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectTileCard;
