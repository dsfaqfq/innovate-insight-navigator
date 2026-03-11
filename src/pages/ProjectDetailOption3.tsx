import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projects } from "@/lib/mockData";
import { mockReferences } from "@/lib/mockReferences";
import PwcHeader from "@/components/PwcHeader";
import RdLevelBadge from "@/components/RdLevelBadge";
import StatusBadge from "@/components/StatusBadge";
import { ArrowLeft, Upload, BookOpen, File, ChevronLeft, ChevronRight, Link2 } from "lucide-react";

const criteriaLabels: Record<string, string> = {
  novelty: "Novelty",
  uncertainty: "Uncertainty",
  creativity: "Creativity",
  systematic: "Systematic",
  transferable: "Transferable",
};

const criteriaKeys = Object.keys(criteriaLabels);

const ProjectDetailOption3 = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [highlightedRef, setHighlightedRef] = useState<string | null>(null);

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

  const currentKey = criteriaKeys[currentIndex];
  const currentLabel = criteriaLabels[currentKey];
  const currentJustification = project.criteria?.[currentKey as keyof typeof project.criteria];
  const currentRefs = mockReferences[currentKey];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PwcHeader />

      {/* Wireframe label */}
      <div className="border-b border-primary/20 bg-primary/5 px-6 py-2">
        <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-primary">
          Option 3 — Split Claim & Evidence View
        </span>
      </div>

      <div className="border-b border-border bg-card px-6 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
          <ArrowLeft size={13} /> Back to Projects
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <StatusBadge status={project.status} />
            <RdLevelBadge level={project.rdLevel} size="md" />
          </div>
          <div className="h-5 border-l border-border" />
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-secondary text-secondary-foreground rounded-sm hover:bg-muted transition-colors">
              <Upload size={13} /> Upload
            </button>
            <button className="px-4 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition-opacity">
              Run AI Analysis
            </button>
          </div>
        </div>
      </div>

      {project.criteria ? (
        <>
          {/* Criteria tab navigation */}
          <div className="border-b border-border bg-card px-6">
            <div className="flex items-center gap-1">
              {criteriaKeys.map((key, i) => (
                <button
                  key={key}
                  onClick={() => { setCurrentIndex(i); setHighlightedRef(null); }}
                  className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors ${
                    i === currentIndex
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  {criteriaLabels[key]}
                </button>
              ))}
            </div>
          </div>

          {/* Prev / Next + counter */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-muted/30">
            <button
              onClick={() => { setCurrentIndex(Math.max(0, currentIndex - 1)); setHighlightedRef(null); }}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={14} /> Previous
            </button>
            <span className="text-[11px] text-muted-foreground">
              {currentIndex + 1} / {criteriaKeys.length} criteria
            </span>
            <button
              onClick={() => { setCurrentIndex(Math.min(criteriaKeys.length - 1, currentIndex + 1)); setHighlightedRef(null); }}
              disabled={currentIndex === criteriaKeys.length - 1}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>

          {/* Split view */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left — AI Analysis */}
            <div className="flex-1 overflow-y-auto border-r border-border">
              <div className="p-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="wireframe-label">AI Analysis</span>
                </div>
                <h2 className="text-lg font-bold text-foreground mb-6">{currentLabel}</h2>

                <div className="prose prose-sm max-w-none">
                  <p className="text-sm text-muted-foreground leading-[1.8]">
                    {currentJustification}
                  </p>
                </div>

                {/* Claim-to-evidence links */}
                {currentRefs && (
                  <div className="mt-8 border-t border-border pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Link2 size={13} className="text-muted-foreground" />
                      <span className="text-xs font-semibold text-foreground">
                        {currentRefs.frascati.length + currentRefs.documents.length} supporting references
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentRefs.frascati.map((fr) => (
                        <button
                          key={fr.id}
                          onMouseEnter={() => setHighlightedRef(fr.id)}
                          onMouseLeave={() => setHighlightedRef(null)}
                          onClick={() => setHighlightedRef(highlightedRef === fr.id ? null : fr.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-[10px] font-semibold transition-all border ${
                            highlightedRef === fr.id
                              ? "bg-primary text-primary-foreground border-primary scale-105"
                              : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                          }`}
                        >
                          <BookOpen size={10} /> {fr.paragraph}
                        </button>
                      ))}
                      {currentRefs.documents.map((dr) => (
                        <button
                          key={dr.id}
                          onMouseEnter={() => setHighlightedRef(dr.id)}
                          onMouseLeave={() => setHighlightedRef(null)}
                          onClick={() => setHighlightedRef(highlightedRef === dr.id ? null : dr.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-[10px] font-semibold transition-all border ${
                            highlightedRef === dr.id
                              ? "bg-blue-600 text-white border-blue-600 scale-105"
                              : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                          }`}
                        >
                          <File size={10} /> p.{dr.page}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right — Evidence */}
            <div className="w-[440px] overflow-y-auto bg-muted/20">
              <div className="p-6">
                <span className="wireframe-label block mb-6">Supporting Evidence</span>

                {currentRefs ? (
                  <div className="space-y-6">
                    {/* Frascati */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-4 bg-primary rounded-full" />
                        <BookOpen size={13} className="text-primary" />
                        <span className="text-xs font-semibold text-foreground">Frascati Manual</span>
                      </div>
                      <div className="space-y-2 ml-3">
                        {currentRefs.frascati.map((fr) => (
                          <div
                            key={fr.id}
                            className={`border rounded-sm p-4 transition-all ${
                              highlightedRef === fr.id
                                ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-sm"
                                : "border-primary/20 bg-card"
                            }`}
                          >
                            <span className="text-[11px] font-semibold text-primary block mb-0.5">{fr.section}</span>
                            <span className="text-[10px] text-muted-foreground block mb-2">Paragraph {fr.paragraph}</span>
                            <p className="text-xs text-muted-foreground leading-relaxed italic">
                              "{fr.excerpt}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 border-t border-border" />
                      <span className="text-[10px] text-muted-foreground">•</span>
                      <div className="flex-1 border-t border-border" />
                    </div>

                    {/* Documents */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-4 bg-blue-500 rounded-full" />
                        <File size={13} className="text-blue-600" />
                        <span className="text-xs font-semibold text-foreground">Project Documents</span>
                      </div>
                      <div className="space-y-2 ml-3">
                        {currentRefs.documents.map((dr) => (
                          <div
                            key={dr.id}
                            className={`border rounded-sm p-4 transition-all ${
                              highlightedRef === dr.id
                                ? "border-blue-500 bg-blue-100/50 ring-2 ring-blue-200 shadow-sm"
                                : "border-blue-200 bg-card"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[11px] font-semibold text-blue-700">{dr.fileName}</span>
                              <span className="text-[10px] text-blue-500 bg-blue-100 px-1.5 py-0.5 rounded-sm">p. {dr.page}</span>
                            </div>
                            {dr.section && (
                              <span className="text-[10px] text-muted-foreground block mb-2">{dr.section}</span>
                            )}
                            <p className="text-xs text-muted-foreground leading-relaxed italic">
                              "{dr.excerpt}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No references available.</p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <main className="flex-1 flex items-center justify-center">
          <div className="border border-dashed border-border rounded-sm p-8 text-center max-w-md">
            <p className="text-sm font-medium text-foreground mb-2">
              {project.status === "analyzing" ? "Analysis in progress…" : "No analysis yet"}
            </p>
            <p className="text-xs text-muted-foreground">
              {project.status === "analyzing"
                ? "R&D evaluation and references will appear once analysis is complete."
                : "Upload documents and run AI analysis to generate R&D evaluation."}
            </p>
          </div>
        </main>
      )}
    </div>
  );
};

export default ProjectDetailOption3;
