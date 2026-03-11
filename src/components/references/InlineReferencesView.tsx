import { useState } from "react";
import { BookOpen, FileText, ChevronDown, ChevronUp } from "lucide-react";
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

const InlineReferencesView = ({ criteria, references }: Props) => {
  const [expandedRef, setExpandedRef] = useState<string | null>(null);

  const toggle = (id: string) => setExpandedRef((prev) => (prev === id ? null : id));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
          <span className="inline-block w-2 h-2 rounded-full bg-primary" /> Frascati Reference
        </div>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground ml-4">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--pwc-tangerine))" }} /> User Document
        </div>
      </div>

      {Object.entries(criteria).map(([key, justification]) => {
        const refs = references[key];
        if (!refs) return null;

        return (
          <div key={key} className="border border-border rounded-sm bg-card">
            <div className="px-5 pt-5 pb-3">
              <h3 className="text-sm font-semibold text-foreground mb-3">{criteriaLabels[key]}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{justification}</p>

              {/* Inline reference badges */}
              <div className="flex flex-wrap gap-1.5">
                {refs.frascati.map((ref) => (
                  <button
                    key={ref.id}
                    onClick={() => toggle(ref.id)}
                    className={`inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded-sm border transition-colors ${
                      expandedRef === ref.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-foreground border-border hover:bg-muted"
                    }`}
                  >
                    <BookOpen size={11} />
                    {ref.section}
                  </button>
                ))}
                {refs.userDocs.map((ref) => (
                  <button
                    key={ref.id}
                    onClick={() => toggle(ref.id)}
                    className={`inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded-sm border transition-colors ${
                      expandedRef === ref.id
                        ? "border-border bg-muted text-foreground"
                        : "border-border bg-card hover:bg-muted text-foreground"
                    }`}
                    style={
                      expandedRef === ref.id
                        ? { borderColor: "hsl(var(--pwc-tangerine))", backgroundColor: "hsl(var(--pwc-tangerine) / 0.1)" }
                        : {}
                    }
                  >
                    <FileText size={11} style={{ color: "hsl(var(--pwc-tangerine))" }} />
                    {ref.documentName.length > 20 ? ref.documentName.slice(0, 18) + "…" : ref.documentName}
                  </button>
                ))}
              </div>
            </div>

            {/* Expanded reference preview */}
            {refs.frascati
              .filter((r) => expandedRef === r.id)
              .map((ref) => (
                <div key={ref.id} className="border-t border-border px-5 py-4 bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={13} className="text-primary" />
                    <span className="text-xs font-semibold text-foreground">
                      Frascati Manual — {ref.section}: {ref.title}
                    </span>
                    {ref.page && <span className="text-[10px] text-muted-foreground">({ref.page})</span>}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">"{ref.excerpt}"</p>
                </div>
              ))}
            {refs.userDocs
              .filter((r) => expandedRef === r.id)
              .map((ref) => (
                <div key={ref.id} className="border-t px-5 py-4" style={{ borderColor: "hsl(var(--pwc-tangerine) / 0.3)", backgroundColor: "hsl(var(--pwc-tangerine) / 0.04)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={13} style={{ color: "hsl(var(--pwc-tangerine))" }} />
                    <span className="text-xs font-semibold text-foreground">{ref.documentName}</span>
                    {ref.section && <span className="text-[10px] text-muted-foreground">— {ref.section}</span>}
                    {ref.page && <span className="text-[10px] text-muted-foreground">({ref.page})</span>}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">"{ref.excerpt}"</p>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default InlineReferencesView;
