import { useState } from "react";
import { BookOpen, FileText, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectReferences, UserDocReference } from "@/lib/referenceData";

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

const fileTypeColors: Record<string, string> = {
  pdf: "text-destructive",
  docx: "text-primary",
  xlsx: "text-accent-foreground",
  txt: "text-muted-foreground",
};

/** Simulated "page" content keyed by document name + page */
const simulatedPages: Record<string, string[]> = {
  "technical_spec_v3.pdf": [
    "TECHNICAL SPECIFICATION v3.0\n\nProject: Neural Architecture Search Framework\nVersion: 3.0 — Final Draft\nDate: 2025-11-14\n\nTable of Contents\n1. Introduction .......................... 2\n2. Background & Constraints ............. 5\n3. Technical Approach ................... 10\n4. System Architecture .................. 16\n5. Evaluation Framework ................. 19\n6. Generalization ....................... 22\n7. API Reference ........................ 25",
    "§2.4 — Constraints\n\nThe primary constraints governing the search framework are:\n\n• Inference latency: Target sub-100ms on ARM Cortex-A78\n• Accuracy floor: Minimum 92% top-1 on target benchmarks\n• Memory budget: Peak memory ≤ 512 MB during inference\n\nThe feasibility of achieving sub-100ms inference latency on ARM Cortex-A78 while maintaining >92% accuracy was unknown at project inception. Prior NAS frameworks have not demonstrated this combination on edge hardware.\n\nRisk assessment conducted in Q1 indicated a 40–60% probability of meeting all three constraints simultaneously.",
    "§3.1 — Approach\n\nOur approach departs from standard methods by introducing a hybrid evolutionary-gradient search that dynamically expands the architecture space during optimization.\n\nUnlike fixed-space methods (DARTS, ENAS, ProxylessNAS), our framework begins with a minimal topology and progressively introduces new operator types and connectivity patterns based on fitness landscape analysis.\n\nKey innovations:\n1. Dynamic search space expansion via topology mutation\n2. Gradient-guided operator selection within expanded spaces\n3. Multi-objective Pareto front maintenance across latency, accuracy, and memory axes",
    "§7 — Generalization\n\nThe search framework is parameterized to accept arbitrary hardware constraint profiles, enabling application to FPGA, mobile SoC, or server GPU targets.\n\nConstraint profiles are defined as JSON schemas specifying:\n• Maximum inference latency (ms)\n• Peak memory (MB)\n• Supported operator set\n• Target precision (FP32 / FP16 / INT8)\n\nPorting to a new hardware target requires only a new constraint profile and a latency lookup table (LUT) for the target device.",
  ],
  "literature_review.pdf": [
    "LITERATURE REVIEW\n\nNeural Architecture Search: State of the Art\n\nPrepared for: R&D Tax Credit Application\nDate: 2025-10-20\n\n1. Introduction\n2. Prior Work\n3. Gap Analysis\n4. Conclusions",
    "§2 — Prior Work\n\nExisting NAS frameworks (DARTS, ENAS, ProxylessNAS) all operate within fixed, predefined search spaces. No prior work combines evolutionary expansion with gradient descent.\n\nDARTS (Liu et al., 2019): Continuous relaxation of architecture search. Fixed cell structure with predefined operation set. No dynamic expansion.\n\nENAS (Pham et al., 2018): Weight sharing across candidate architectures. Search space defined a priori. Efficient but constrained.\n\nProxylessNAS (Cai et al., 2019): Direct search on target hardware. Fixed operation set; no topology mutation.\n\nGap: No existing framework supports runtime expansion of the search space based on optimization progress.",
  ],
  "experiment_logs_q4.pdf": [
    "EXPERIMENT LOGS — Q4 2025\n\nProject: NAS Framework Development\nPeriod: October 1 – December 31, 2025\nTotal experiments: 47\n\nLog format:\n  Exp #  |  Date  |  Config  |  Result  |  Notes\n\nComplete experiment log covering 47 runs with hyperparameter settings, hardware configuration, and results including all failed attempts.",
    "Experiments 14–23: Crossover Operator Investigation\n\nExp 14 (Oct 18): Standard uniform crossover. Diverged after 200 gen.\nExp 15 (Oct 19): Single-point crossover. Premature convergence.\nExp 16 (Oct 20): Two-point crossover. Unstable fitness.\nExp 17 (Oct 21): Uniform + elitism. Marginal improvement.\nExp 18 (Oct 22): BLX-α crossover. No convergence.\nExp 19 (Oct 23): Simulated binary crossover. Diverged.\nExp 20 (Oct 25): Arithmetic crossover. Slow convergence.\nExp 21 (Oct 27): Partially mapped crossover. Invalid topologies.\nExp 22 (Oct 28): Order crossover. Not applicable to DAGs.\nExp 23 (Oct 30): Edge recombination. Failed on variable-size graphs.\n\nExp 24 (Nov 2): Custom topology-aware crossover.\n  → Preserves sub-graph motifs during recombination\n  → Validates DAG constraints post-crossover\n  → CONVERGED. 94.1% accuracy, 87ms latency.\n  ★ BREAKTHROUGH — adopted as default operator.",
  ],
  "design_rationale.docx": [
    "DESIGN RATIONALE\n\nMulti-Objective Encoding for Neural Architecture Search\n\nAuthor: Research Team\nVersion: 2.1\nDate: 2025-09-30\n\n1. Motivation\n2. Failed Approaches\n3. Proposed Encoding\n4. Validation",
    "§4.1 — Encoding Design\n\nThe multi-objective encoding scheme was developed internally after standard approaches proved inadequate. It encodes topology, operations, and connectivity in a unified representation.\n\nEncoding structure:\n  [topology_genes | operation_genes | connectivity_genes | constraint_genes]\n\nTopology genes: Variable-length adjacency list (supports DAG growth)\nOperation genes: One-hot per node (expandable operation set)\nConnectivity genes: Edge probability matrix\nConstraint genes: Hardware target parameters\n\nThis unified encoding enables simultaneous optimization of architecture structure and deployment constraints — a capability absent in existing NAS encodings.",
  ],
  "methodology_report.pdf": [
    "METHODOLOGY REPORT\n\nEvaluation Protocol for NAS Framework\n\nPrepared by: Evaluation Team\nDate: 2025-12-10\n\n1. Overview\n2. Benchmark Selection\n3. Statistical Framework\n4. Hardware Setup\n5. Reproducibility\n6. Evaluation Protocol",
    "§6 — Evaluation Protocol\n\nEach architecture variant was evaluated on ImageNet and CIFAR-100 with 5 seeds per configuration. Statistical significance was established using paired t-tests (p < 0.01).\n\nBenchmark details:\n• ImageNet (ILSVRC 2012): 1.28M train / 50K val images\n• CIFAR-100: 50K train / 10K test images\n\nFor each candidate architecture:\n1. Train from scratch × 5 random seeds\n2. Record top-1 accuracy, inference latency, peak memory\n3. Compute mean ± std across seeds\n4. Paired t-test against baseline (p < 0.01 threshold)\n5. Pareto dominance check across all objectives",
  ],
  "patent_landscape.xlsx": [
    "PATENT LANDSCAPE ANALYSIS\n\nSearch conducted: September 2025\nDatabases: USPTO, EPO, WIPO\n\nQuery terms:\n• \"neural architecture search\" AND \"dynamic search space\"\n• \"evolutionary\" AND \"architecture optimization\" AND \"expansion\"\n• \"NAS\" AND \"topology mutation\"\n\nTotal results: 0 relevant patents found",
    "Sheet 2 — Detailed Results\n\nPatent search across USPTO, EPO, and WIPO databases returned zero results for 'dynamic search space expansion in neural architecture search'.\n\nNearest matches (not relevant):\n• US10,XXX,XXX: Fixed-space NAS with pruning (Google, 2021)\n• EP3,XXX,XXX: Hardware-aware NAS (Qualcomm, 2022)\n• WO2023/XXXXXX: Multi-objective optimization (Samsung, 2023)\n\nNone of these patents describe dynamic expansion of the architecture search space during optimization. Our approach is novel in this regard.",
  ],
  "ablation_study.pdf": [
    "ABLATION STUDY\n\nComponent Contribution Analysis\n\nDate: 2025-12-15\n\n1. Overview\n2. Ablation Results\n3. Discussion",
    "§2 — Ablation Results\n\nSystematic ablation removing each component individually confirms that both the evolutionary expansion and gradient refinement contribute meaningfully to final performance.\n\n                        Accuracy    Latency    Memory\nFull system             94.1%       87ms       438MB\n− Evolutionary expansion 91.2%      92ms       461MB    (−2.9%)\n− Gradient refinement    92.8%       89ms       445MB    (−1.3%)\n− Both (random search)   88.4%      101ms       489MB    (−5.7%)\n− Constraint genes       94.0%      142ms       512MB    (latency +63%)\n\nAll differences statistically significant (p < 0.001, paired t-test, n=5 seeds).\n\nConclusion: Each component contributes independently. The evolutionary expansion has the largest single impact on accuracy.",
  ],
  "api_documentation.pdf": [
    "API DOCUMENTATION\n\nNAS Framework — Public API Reference\n\nVersion: 1.0.0\nLast updated: 2025-12-20\n\nTable of Contents\n1. Getting Started\n2. Configuration\n3. Search Space Definition\n4. Constraint Profiles\n5. Extension Points\n6. Examples",
    "Public API documentation covering all configuration options, input formats, and extension points for custom search space definitions.\n\n## Quick Start\n\n```python\nfrom nas_framework import SearchEngine, ConstraintProfile\n\nprofile = ConstraintProfile(\n    max_latency_ms=100,\n    max_memory_mb=512,\n    precision=\"fp16\",\n    target_device=\"arm_cortex_a78\"\n)\n\nengine = SearchEngine(\n    search_space=\"auto\",\n    objectives=[\"accuracy\", \"latency\", \"memory\"],\n    constraint_profile=profile\n)\n\nresult = engine.search(dataset=\"imagenet\", generations=500)\nprint(result.best_architecture)\n```",
  ],
};

/** Get simulated page index from page string */
function getPageIndex(page?: string): number {
  if (!page) return 0;
  const match = page.match(/(\d+)/);
  if (!match) return 0;
  const num = parseInt(match[1], 10);
  // Map to simulated page indices
  if (num <= 1) return 0;
  if (num <= 8) return 1;
  if (num <= 15) return 2;
  return Math.min(3, num > 20 ? 3 : 2);
}

const DocumentPreviewView = ({ criteria, references }: Props) => {
  const [selectedCriterion, setSelectedCriterion] = useState<string>(Object.keys(criteria)[0]);
  const [selectedDoc, setSelectedDoc] = useState<UserDocReference | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const refs = references[selectedCriterion];
  const userDocs = refs?.userDocs ?? [];

  // Auto-select first doc when criterion changes
  const handleSelectCriterion = (key: string) => {
    setSelectedCriterion(key);
    const newRefs = references[key];
    if (newRefs?.userDocs?.length) {
      const doc = newRefs.userDocs[0];
      setSelectedDoc(doc);
      setCurrentPage(getPageIndex(doc.page));
    } else {
      setSelectedDoc(null);
      setCurrentPage(0);
    }
  };

  const handleSelectDoc = (doc: UserDocReference) => {
    setSelectedDoc(doc);
    setCurrentPage(getPageIndex(doc.page));
  };

  const pages = selectedDoc ? simulatedPages[selectedDoc.documentName] ?? [] : [];
  const highlightPage = selectedDoc ? getPageIndex(selectedDoc.page) : -1;

  return (
    <div className="space-y-4">
      {/* Criterion tabs */}
      <div className="flex gap-1 border-b border-border pb-3">
        {Object.entries(criteria).map(([key]) => (
          <button
            key={key}
            onClick={() => handleSelectCriterion(key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
              selectedCriterion === key
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {criteriaLabels[key]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-6" style={{ minHeight: 520 }}>
        {/* Left: Criterion summary + document list */}
        <div className="col-span-2 space-y-4">
          {/* AI justification */}
          <div className="border border-border rounded-sm bg-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              {criteriaLabels[selectedCriterion]}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {criteria[selectedCriterion]}
            </p>
          </div>

          {/* Frascati refs (compact) */}
          {refs?.frascati?.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                  Frascati References
                </span>
              </div>
              <div className="space-y-1.5">
                {refs.frascati.map((ref) => (
                  <div key={ref.id} className="border border-border rounded-sm px-3 py-2 bg-card">
                    <div className="flex items-center gap-1.5 mb-1">
                      <BookOpen size={11} className="text-primary" />
                      <span className="text-[11px] font-semibold text-foreground">
                        {ref.section}: {ref.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed italic line-clamp-2">
                      "{ref.excerpt}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User document list */}
          {userDocs.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: "hsl(var(--pwc-tangerine))" }}
                />
                <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                  Project Documents
                </span>
              </div>
              <div className="space-y-1.5">
                {userDocs.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => handleSelectDoc(doc)}
                    className={`w-full text-left border rounded-sm px-3 py-2.5 transition-colors ${
                      selectedDoc?.id === doc.id
                        ? "border-border bg-muted"
                        : "border-border bg-card hover:bg-muted"
                    }`}
                    style={
                      selectedDoc?.id === doc.id
                        ? {
                            borderColor: "hsl(var(--pwc-tangerine))",
                            backgroundColor: "hsl(var(--pwc-tangerine) / 0.06)",
                          }
                        : {}
                    }
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <FileText
                        size={12}
                        style={{ color: "hsl(var(--pwc-tangerine))" }}
                      />
                      <span className="text-xs font-medium text-foreground">
                        {doc.documentName}
                      </span>
                      <span className="text-[10px] text-muted-foreground ml-auto">
                        {doc.page}
                      </span>
                    </div>
                    {doc.section && (
                      <span className="text-[10px] text-muted-foreground">{doc.section}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Document preview */}
        <div className="col-span-3 border border-border rounded-sm bg-card flex flex-col overflow-hidden">
          {selectedDoc && pages.length > 0 ? (
            <>
              {/* Document header bar */}
              <div
                className="flex items-center justify-between px-4 py-2 border-b border-border"
                style={{ backgroundColor: "hsl(var(--pwc-tangerine) / 0.06)" }}
              >
                <div className="flex items-center gap-2">
                  <Eye size={13} style={{ color: "hsl(var(--pwc-tangerine))" }} />
                  <span className="text-xs font-semibold text-foreground">
                    {selectedDoc.documentName}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase font-medium">
                    {selectedDoc.type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className="p-1 rounded-sm hover:bg-muted disabled:opacity-30 text-foreground"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <span className="text-[11px] text-muted-foreground font-medium">
                    Page {currentPage + 1} / {pages.length}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
                    disabled={currentPage === pages.length - 1}
                    className="p-1 rounded-sm hover:bg-muted disabled:opacity-30 text-foreground"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Page content */}
              <div className="flex-1 overflow-auto p-6 bg-background">
                <div
                  className={`font-mono text-xs leading-relaxed whitespace-pre-wrap rounded-sm p-5 border transition-all ${
                    currentPage === highlightPage
                      ? "border-border bg-card shadow-sm"
                      : "border-border bg-card"
                  }`}
                  style={
                    currentPage === highlightPage
                      ? {
                          borderColor: "hsl(var(--pwc-tangerine))",
                          boxShadow: "0 0 0 2px hsl(var(--pwc-tangerine) / 0.15)",
                        }
                      : {}
                  }
                >
                  {/* Highlight the matching excerpt */}
                  {currentPage === highlightPage && selectedDoc.excerpt
                    ? renderHighlightedContent(pages[currentPage], selectedDoc.excerpt)
                    : pages[currentPage]}
                </div>

                {currentPage === highlightPage && (
                  <div
                    className="mt-3 flex items-center gap-2 px-3 py-2 rounded-sm text-[11px]"
                    style={{
                      backgroundColor: "hsl(var(--pwc-tangerine) / 0.08)",
                      color: "hsl(var(--pwc-tangerine))",
                    }}
                  >
                    <Eye size={12} />
                    <span className="font-medium">
                      Highlighted: referenced section for {criteriaLabels[selectedCriterion]}
                    </span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <FileText size={32} className="mx-auto mb-3 text-muted-foreground/40" />
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  No document selected
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Select a project document from the left to preview the referenced section
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/** Renders page content with the excerpt highlighted */
function renderHighlightedContent(content: string, excerpt: string) {
  const trimmedExcerpt = excerpt.slice(0, 80); // Match on a prefix for reliability
  const idx = content.indexOf(trimmedExcerpt);

  if (idx === -1) {
    // Fallback: no match, just render with a top highlight bar
    return (
      <span>
        {content}
      </span>
    );
  }

  const before = content.slice(0, idx);
  const match = content.slice(idx, idx + excerpt.length);
  const after = content.slice(idx + excerpt.length);

  return (
    <>
      {before}
      <mark
        className="rounded px-0.5"
        style={{
          backgroundColor: "hsl(var(--pwc-tangerine) / 0.18)",
          borderBottom: "2px solid hsl(var(--pwc-tangerine))",
          color: "inherit",
        }}
      >
        {match}
      </mark>
      {after}
    </>
  );
}

export default DocumentPreviewView;
