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
      className="group bg-card border border-border rounded-lg p-4 shadow-card card-interactive cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <StatusBadge status={project.status} />
        <RdLevelBadge level={project.rdLevel} />
      </div>
      <h3 className="text-body font-semibold text-foreground mb-1.5 group-hover:text-secondary transition-colors">
        {project.name}
      </h3>
      <p className="text-caption text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{project.description}</p>

      {project.criteria && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {Object.keys(project.criteria).map((key) => (
            <span key={key} className="text-micro px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded-sm capitalize">{key}</span>
          ))}
        </div>
      )}
      {!project.criteria && (
        <p className="text-caption text-muted-foreground italic mb-4">Analysis not yet available</p>
      )}

      <div className="flex items-center justify-between text-caption text-muted-foreground pt-3 border-t border-border">
        <span className="flex items-center gap-1"><FileText size={11} /> {project.documentsCount} docs</span>
        <span>{project.lastUpdated}</span>
      </div>

      {showTags && (
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border">
          {project.tags.map((tag) => (
            <span key={tag} className="text-micro px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-sm">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectTileCard;
