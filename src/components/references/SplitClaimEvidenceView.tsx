import { useState } from "react";
import { BookOpen, FileText, ChevronLeft, ChevronRight, Link2 } from "lucide-react";
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

const SplitClaimEvidenceView = ({ criteria, references }: Props) => {
  const keys = Object.keys(criteria);
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentKey = keys[currentIdx];
  const justification = criteria[currentKey];
  const refs = references[currentKey];

  const prev = () => setCurrentIdx((i) => Math.max(0, i - 1));
  const next = () => setCurrentIdx((i) => Math.min(keys.length - 1, i + 1));

  return (
    <div className="space-y-4">
      {/* Criterion navigator */}
      <div className="flex items-center justify-between border border-border rounded-sm bg-card px-4 py-3">
        <button
          onClick={prev}
          disabled={currentIdx === 0}
          className="flex items-center gap-1 text-xs font-medium text-foreground disabled:text-muted-foreground disabled:cursor-not-allowed hover:text-primary transition-colors"
        >
          <ChevronLeft size={14} /> Previous
        </button>
        <div className="flex items-center gap-3">
          {keys.map((key, i) => (
            <button
              key={key}
              onClick={() => setCurrentIdx(i)}
              className={`text-xs font-medium px-3 py-1 rounded-sm transition-colors ${
                i === currentIdx
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {criteriaLabels[key]}
            </button>
          ))}
        </div>
        <button
          onClick={next}
          disabled={currentIdx === keys.length - 1}
          className="flex items-center gap-1 text-xs font-medium text-foreground disabled:text-muted-foreground disabled:cursor-not-allowed hover:text-primary transition-colors"
        >
          Next <ChevronRight size={14} />
        </button>
      </div>

      {/* Split view */}
      <div className="grid grid-cols-2 gap-0 border border-border rounded-sm overflow-hidden min-h-[420px]">
        {/* Left: AI Analysis */}
        <div className="bg-card border-r border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 rounded-full bg-primary" />
            <h3 className="text-sm font-bold text-foreground">AI Analysis — {criteriaLabels[currentKey]}</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{justification}</p>

          <div className="border-t border-border pt-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Link2 size={12} className="text-muted-foreground" />
              <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                Linked Evidence
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {refs?.frascati.map((r) => (
                <span key={r.id} className="text-[10px] px-1.5 py-0.5 rounded-sm bg-primary/10 text-primary font-medium">
                  {r.section}
                </span>
              ))}
              {refs?.userDocs.map((r) => (
                <span
                  key={r.id}
                  className="text-[10px] px-1.5 py-0.5 rounded-sm font-medium"
                  style={{ backgroundColor: "hsl(var(--pwc-tangerine) / 0.1)", color: "hsl(var(--pwc-tangerine))" }}
                >
                  {r.documentName.length > 18 ? r.documentName.slice(0, 16) + "…" : r.documentName}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Supporting Evidence */}
        <div className="bg-background p-6 overflow-y-auto">
          <h3 className="text-sm font-bold text-foreground mb-5">Supporting Evidence</h3>

          {/* Frascati */}
          <div className="mb-6">
            <div className="flex items-center gap-1.5 mb-3">
              <BookOpen size={13} className="text-primary" />
              <span className="text-[10px] uppercase tracking-widest font-semibold text-primary">
                Frascati Framework
              </span>
            </div>
            <div className="space-y-3">
              {refs?.frascati.map((ref) => (
                <div key={ref.id} className="border border-border rounded-sm p-3 bg-card relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-l-sm" />
                  <div className="flex items-baseline justify-between mb-1.5 pl-2">
                    <span className="text-xs font-semibold text-foreground">{ref.section}: {ref.title}</span>
                    {ref.page && <span className="text-[10px] text-muted-foreground">{ref.page}</span>}
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed italic pl-2">"{ref.excerpt}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* User docs */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <FileText size={13} style={{ color: "hsl(var(--pwc-tangerine))" }} />
              <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "hsl(var(--pwc-tangerine))" }}>
                Project Documents
              </span>
            </div>
            <div className="space-y-3">
              {refs?.userDocs.map((ref) => (
                <div key={ref.id} className="border rounded-sm p-3 bg-card relative" style={{ borderColor: "hsl(var(--pwc-tangerine) / 0.25)" }}>
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-sm" style={{ backgroundColor: "hsl(var(--pwc-tangerine))" }} />
                  <div className="flex items-baseline justify-between mb-1 pl-2">
                    <span className="text-xs font-semibold text-foreground">{ref.documentName}</span>
                    <span className="text-[10px] text-muted-foreground uppercase">{ref.type}</span>
                  </div>
                  {ref.section && (
                    <span className="text-[10px] text-muted-foreground block mb-1 pl-2">
                      {ref.section} {ref.page && `· ${ref.page}`}
                    </span>
                  )}
                  <p className="text-[11px] text-muted-foreground leading-relaxed italic pl-2">"{ref.excerpt}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitClaimEvidenceView;
