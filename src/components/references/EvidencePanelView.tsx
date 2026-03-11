import { useState } from "react";
import { BookOpen, FileText, ChevronRight } from "lucide-react";
import type { ProjectReferences } from "@/lib/referenceData";

const criteriaLabels: Record<string, string> = {
  novelty: "Novelty",
  uncertainty: "Uncertainty",
  creativity: "Creativity",
  systematic: "Systematic",
  transferable: "Transferable",
};

interface Props {
  criteria: Record<string, string>;
  references: ProjectReferences;
}

const EvidencePanelView = ({ criteria, references }: Props) => {
  const keys = Object.keys(criteria);
  const [selectedCriterion, setSelectedCriterion] = useState<string>(keys[0] || "novelty");
  const refs = references[selectedCriterion];

  return (
    <div className="grid grid-cols-5 gap-0 border border-border rounded-sm bg-card overflow-hidden min-h-[500px]">
      {/* Left: main content — 3 cols */}
      <div className="col-span-3 border-r border-border overflow-y-auto">
        <div className="px-5 pt-5 pb-3">
          <h2 className="wireframe-label mb-4">Evaluation Criteria</h2>
        </div>
        <div className="space-y-0">
          {Object.entries(criteria).map(([key, justification]) => {
            const isSelected = selectedCriterion === key;
            const refCount = refs ? refs.frascati.length + refs.userDocs.length : 0;
            const thisRefs = references[key];
            const thisCount = thisRefs ? thisRefs.frascati.length + thisRefs.userDocs.length : 0;

            return (
              <button
                key={key}
                onClick={() => setSelectedCriterion(key)}
                className={`w-full text-left px-5 py-4 border-b border-border transition-colors ${
                  isSelected ? "bg-muted" : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-foreground">{criteriaLabels[key]}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-muted-foreground">{thisCount} refs</span>
                    <ChevronRight size={13} className={`text-muted-foreground transition-transform ${isSelected ? "text-primary rotate-0" : ""}`} />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{justification}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: evidence panel — 2 cols */}
      <div className="col-span-2 overflow-y-auto bg-background">
        <div className="px-4 pt-5 pb-3 border-b border-border">
          <h2 className="wireframe-label">
            Evidence — {criteriaLabels[selectedCriterion]}
          </h2>
        </div>

        {refs && (
          <div className="divide-y divide-border">
            {/* Frascati section */}
            <div className="px-4 py-4">
              <div className="flex items-center gap-1.5 mb-3">
                <BookOpen size={13} className="text-primary" />
                <span className="text-[10px] uppercase tracking-widest font-semibold text-primary">
                  Frascati Basis
                </span>
                <span className="ml-auto text-[10px] text-muted-foreground">{refs.frascati.length}</span>
              </div>
              <div className="space-y-3">
                {refs.frascati.map((ref) => (
                  <div key={ref.id} className="border border-border rounded-sm p-3 bg-card">
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-xs font-semibold text-foreground">{ref.section}: {ref.title}</span>
                      {ref.page && <span className="text-[10px] text-muted-foreground">{ref.page}</span>}
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed italic">"{ref.excerpt}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* User docs section */}
            <div className="px-4 py-4">
              <div className="flex items-center gap-1.5 mb-3">
                <FileText size={13} style={{ color: "hsl(var(--pwc-tangerine))" }} />
                <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "hsl(var(--pwc-tangerine))" }}>
                  Project Documents
                </span>
                <span className="ml-auto text-[10px] text-muted-foreground">{refs.userDocs.length}</span>
              </div>
              <div className="space-y-3">
                {refs.userDocs.map((ref) => (
                  <div key={ref.id} className="border rounded-sm p-3 bg-card" style={{ borderColor: "hsl(var(--pwc-tangerine) / 0.25)" }}>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-xs font-semibold text-foreground">{ref.documentName}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">{ref.type}</span>
                    </div>
                    {ref.section && <span className="text-[10px] text-muted-foreground block mb-1">{ref.section} {ref.page && `· ${ref.page}`}</span>}
                    <p className="text-[11px] text-muted-foreground leading-relaxed italic">"{ref.excerpt}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvidencePanelView;
