import { LayoutGrid, List, Rows3, Tags, FolderTree } from "lucide-react";

export type NavigationMode = "programs" | "tags";
export type DisplayMode = "tiles" | "list" | "compact";

interface WireframeControlsProps {
  navigationMode: NavigationMode;
  displayMode: DisplayMode;
  onNavigationChange: (mode: NavigationMode) => void;
  onDisplayChange: (mode: DisplayMode) => void;
  selectedProgram: string | null;
  onBackToPrograms: () => void;
}

const WireframeControls = ({
  navigationMode,
  displayMode,
  onNavigationChange,
  onDisplayChange,
  selectedProgram,
  onBackToPrograms,
}: WireframeControlsProps) => {
  return (
    <div className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
      <div className="flex items-center gap-6">
        <div className="flex items-center">
          <span className="wireframe-label mr-3">Navigation</span>
          <div className="inline-flex rounded-md border border-border overflow-hidden">
            <button
              onClick={() => onNavigationChange("programs")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-caption font-medium transition-colors ${
                navigationMode === "programs"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              <FolderTree size={13} /> Programs → Projects
            </button>
            <button
              onClick={() => onNavigationChange("tags")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-caption font-medium transition-colors ${
                navigationMode === "tags"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              <Tags size={13} /> Tags on Projects
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <span className="wireframe-label mr-3">Display</span>
          <div className="inline-flex rounded-md border border-border overflow-hidden">
            {([
              { mode: "tiles" as const, icon: LayoutGrid, label: "Tiles" },
              { mode: "list" as const, icon: Rows3, label: "List" },
              { mode: "compact" as const, icon: List, label: "Compact" },
            ]).map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => onDisplayChange(mode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-caption font-medium transition-colors ${
                  displayMode === mode
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-muted"
                }`}
              >
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {navigationMode === "programs" && selectedProgram && (
        <button
          onClick={onBackToPrograms}
          className="text-caption font-medium text-primary hover:underline"
        >
          ← Back to Programs
        </button>
      )}
    </div>
  );
};

export default WireframeControls;
