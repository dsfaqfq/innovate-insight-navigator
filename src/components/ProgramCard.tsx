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
        className="group flex items-center gap-4 px-4 py-2.5 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors"
      >
        <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: program.color }} />
        <span className="text-sm font-medium text-foreground flex-1 group-hover:text-primary transition-colors">{program.name}</span>
        <span className="text-xs text-muted-foreground">{program.projectCount} projects</span>
        <span className="text-[11px] px-2 py-0.5 rounded-sm bg-secondary text-secondary-foreground">avg {program.avgRdLevel}% R&D</span>
        <ChevronRight size={14} className="text-muted-foreground" />
      </div>
    );
  }

  if (displayMode === "list") {
    return (
      <div
        onClick={onClick}
        className="group flex items-center gap-5 p-5 border border-border rounded-sm bg-card hover:border-primary/40 hover:shadow-sm cursor-pointer transition-all"
      >
        <div className="w-1.5 h-10 rounded-full shrink-0" style={{ backgroundColor: program.color }} />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{program.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{program.description}</p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-xs text-muted-foreground">{program.projectCount} projects</span>
          <span className="text-xs px-2 py-1 rounded-sm bg-secondary text-secondary-foreground font-medium">avg {program.avgRdLevel}% R&D</span>
          <ChevronRight size={14} className="text-muted-foreground" />
        </div>
      </div>
    );
  }

  // Tiles
  return (
    <div
      onClick={onClick}
      className="group bg-card border border-border rounded-sm p-5 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: program.color + "18" }}>
          <FolderOpen size={18} style={{ color: program.color }} />
        </div>
        <span className="text-xs px-2 py-1 rounded-sm bg-secondary text-secondary-foreground font-medium">
          avg {program.avgRdLevel}%
        </span>
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{program.name}</h3>
      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{program.description}</p>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border">
        <span>{program.projectCount} projects</span>
        <ChevronRight size={13} />
      </div>
    </div>
  );
};

export default ProgramCard;
