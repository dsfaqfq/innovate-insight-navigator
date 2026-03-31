import { FolderOpen, ChevronRight } from "lucide-react";
import type { Program } from "@/lib/mockData";

interface ProgramCardProps {
  program: Program;
  displayMode: "tiles" | "list" | "compact";
  onClick: () => void;
}

const ProgramCard = ({ program, displayMode, onClick }: ProgramCardProps) => {
  if (displayMode === "compact") {
    return (
      <div
        onClick={onClick}
        className="group flex items-center gap-4 px-5 py-3 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors"
      >
        <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: program.color }} />
        <span className="text-body font-medium text-foreground flex-1 group-hover:text-primary transition-colors">{program.name}</span>
        <span className="text-caption text-muted-foreground">{program.projectCount} projects</span>
        <span className="text-micro px-2.5 py-1 rounded-sm bg-secondary text-secondary-foreground uppercase">avg {program.avgRdLevel}% R&D</span>
        <ChevronRight size={14} className="text-muted-foreground" />
      </div>
    );
  }

  if (displayMode === "list") {
    return (
      <div
        onClick={onClick}
        className="group flex items-center gap-5 p-5 border border-border rounded-lg bg-card shadow-card card-interactive cursor-pointer"
      >
        <div className="w-1.5 h-10 rounded-full shrink-0" style={{ backgroundColor: program.color }} />
        <div className="flex-1">
          <h3 className="text-body font-semibold text-foreground group-hover:text-primary transition-colors">{program.name}</h3>
          <p className="text-caption text-muted-foreground mt-0.5">{program.description}</p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-caption text-muted-foreground">{program.projectCount} projects</span>
          <span className="text-caption px-2.5 py-1 rounded-sm bg-secondary text-secondary-foreground font-medium">avg {program.avgRdLevel}% R&D</span>
          <ChevronRight size={14} className="text-muted-foreground" />
        </div>
      </div>
    );
  }

  // Tiles
  return (
    <div
      onClick={onClick}
      className="group bg-card border border-border rounded-lg p-6 shadow-card card-interactive cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ backgroundColor: program.color + "18" }}>
          <FolderOpen size={18} style={{ color: program.color }} />
        </div>
        <span className="text-caption px-2.5 py-1 rounded-sm bg-secondary text-secondary-foreground font-medium">
          avg {program.avgRdLevel}%
        </span>
      </div>
      <h3 className="text-body font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{program.name}</h3>
      <p className="text-caption text-muted-foreground mb-4 leading-relaxed">{program.description}</p>
      <div className="flex items-center justify-between text-caption text-muted-foreground pt-3 border-t border-border">
        <span>{program.projectCount} projects</span>
        <ChevronRight size={13} />
      </div>
    </div>
  );
};

export default ProgramCard;
