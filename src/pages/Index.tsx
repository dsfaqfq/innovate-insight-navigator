import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { projects, programs } from "@/lib/mockData";
import type { Project } from "@/lib/mockData";
import PwcHeader from "@/components/PwcHeader";
import WireframeControls from "@/components/WireframeControls";
import type { NavigationMode, DisplayMode, DetailMode } from "@/components/WireframeControls";
import SearchFilter from "@/components/SearchFilter";
import ProgramCard from "@/components/ProgramCard";
import ProjectTileCard from "@/components/ProjectTileCard";
import ProjectListRow from "@/components/ProjectListRow";
import ProjectDetailPanel from "@/components/ProjectDetailPanel";
import { Plus } from "lucide-react";

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();

const Index = () => {
  const navigate = useNavigate();
  const [navMode, setNavMode] = useState<NavigationMode>("programs");
  const [displayMode, setDisplayMode] = useState<DisplayMode>("tiles");
  const [detailMode, setDetailMode] = useState<DetailMode>("panel");
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProjects = useMemo(() => {
    let result = projects;
    if (navMode === "programs" && selectedProgram) {
      result = result.filter((p) => p.program === selectedProgram);
    }
    if (selectedTags.length > 0) {
      result = result.filter((p) => selectedTags.some((t) => p.tags.includes(t)));
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [navMode, selectedProgram, selectedTags, search]);

  const showingPrograms = navMode === "programs" && !selectedProgram;

  const heading = showingPrograms
    ? "Programs"
    : navMode === "programs" && selectedProgram
    ? selectedProgram
    : "All Projects";

  const count = showingPrograms ? programs.length : filteredProjects.length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PwcHeader />
      <WireframeControls
        navigationMode={navMode}
        displayMode={displayMode}
        onNavigationChange={(m) => {
          setNavMode(m);
          setSelectedProgram(null);
          setSelectedTags([]);
        }}
        onDisplayChange={setDisplayMode}
        selectedProgram={selectedProgram}
        onBackToPrograms={() => setSelectedProgram(null)}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-6">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h1 className="text-lg font-bold text-foreground">{heading}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{count} {showingPrograms ? "programs" : "projects"}</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition-opacity">
            <Plus size={13} /> New {showingPrograms ? "Program" : "Project"}
          </button>
        </div>

        <div className="mb-5">
          <SearchFilter
            value={search}
            onChange={setSearch}
            placeholder={showingPrograms ? "Search programs..." : "Search projects..."}
            tags={navMode === "tags" ? allTags : undefined}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
          />
        </div>

        {/* Programs view */}
        {showingPrograms && (
          <>
            {displayMode === "tiles" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {programs.map((prog) => (
                  <ProgramCard key={prog.id} program={prog} displayMode="tiles" onClick={() => setSelectedProgram(prog.name)} />
                ))}
              </div>
            )}
            {displayMode === "list" && (
              <div className="space-y-3">
                {programs.map((prog) => (
                  <ProgramCard key={prog.id} program={prog} displayMode="list" onClick={() => setSelectedProgram(prog.name)} />
                ))}
              </div>
            )}
            {displayMode === "compact" && (
              <div className="border border-border rounded-sm bg-card overflow-hidden">
                {programs.map((prog) => (
                  <ProgramCard key={prog.id} program={prog} displayMode="compact" onClick={() => setSelectedProgram(prog.name)} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Projects view */}
        {!showingPrograms && (
          <>
            {displayMode === "tiles" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects.map((proj) => (
                  <ProjectTileCard
                    key={proj.id}
                    project={proj}
                    showTags={navMode === "tags"}
                    onClick={() => setSelectedProject(proj)}
                  />
                ))}
              </div>
            )}
            {displayMode === "list" && (
              <div className="space-y-3">
                {filteredProjects.map((proj) => (
                  <ProjectListRow
                    key={proj.id}
                    project={proj}
                    showTags={navMode === "tags"}
                    onClick={() => setSelectedProject(proj)}
                  />
                ))}
              </div>
            )}
            {displayMode === "compact" && (
              <div className="border border-border rounded-sm bg-card overflow-hidden">
                {filteredProjects.map((proj) => (
                  <ProjectListRow
                    key={proj.id}
                    project={proj}
                    showTags={navMode === "tags"}
                    compact
                    onClick={() => setSelectedProject(proj)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {filteredProjects.length === 0 && !showingPrograms && (
          <div className="text-center py-16">
            <p className="text-sm text-muted-foreground">No projects match your filters.</p>
          </div>
        )}
      </main>

      {selectedProject && (
        <ProjectDetailPanel project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default Index;
