export interface FrascatiReference {
  id: string;
  section: string;
  paragraph: string;
  excerpt: string;
}

export interface DocumentReference {
  id: string;
  fileName: string;
  page: number;
  section?: string;
  excerpt: string;
}

export interface CriterionReferences {
  frascati: FrascatiReference[];
  documents: DocumentReference[];
}

export type CriteriaReferencesMap = Record<string, CriterionReferences>;

export const mockReferences: CriteriaReferencesMap = {
  novelty: {
    frascati: [
      { id: "f1", section: "§2.1 — Novel contribution", paragraph: "2.1.3", excerpt: "R&D activity must involve a meaningful element of novelty — new knowledge, methods, or applications that go beyond the current state of the art in the relevant field." },
      { id: "f2", section: "§2.4 — State of the art", paragraph: "2.4.1", excerpt: "The state of the art comprises the body of knowledge accessible to the professional working in the field. Novelty is assessed relative to this baseline." },
    ],
    documents: [
      { id: "d1", fileName: "technical_spec_v3.pdf", page: 12, section: "3.1 Architecture Overview", excerpt: "The proposed hybrid evolutionary-gradient search combines two previously independent optimization paradigms into a unified framework, enabling dynamic search space expansion." },
      { id: "d2", fileName: "literature_review.pdf", page: 4, section: "2.2 Related Work", excerpt: "No prior work has demonstrated the combination of evolutionary strategies with gradient-based NAS in a single optimization loop targeting edge deployment constraints." },
      { id: "d3", fileName: "patent_search_results.pdf", page: 1, section: "Summary", excerpt: "Patent landscape analysis confirms no existing patents cover the dynamic search space expansion mechanism described in the technical specification." },
    ],
  },
  uncertainty: {
    frascati: [
      { id: "f3", section: "§2.2 — Uncertainty", paragraph: "2.2.1", excerpt: "R&D projects must involve uncertainty about the outcome. The cost and time needed to achieve the objective cannot be precisely determined in advance." },
      { id: "f4", section: "§2.2 — Types of uncertainty", paragraph: "2.2.4", excerpt: "Uncertainty may relate to which approach will succeed, whether the goal is achievable at all, or how long and costly the research will be." },
    ],
    documents: [
      { id: "d4", fileName: "experiment_log_q3.pdf", page: 8, section: "4.2 Failed Approaches", excerpt: "Crossover operators based on standard genetic programming produced degenerate architectures in 78% of runs. Three alternative operator designs were tested before identifying a viable strategy." },
      { id: "d5", fileName: "technical_spec_v3.pdf", page: 22, section: "5.1 Performance Targets", excerpt: "The target of sub-100ms inference on ARM Cortex-A78 cores has not been achieved by any existing NAS method, making the outcome unpredictable." },
    ],
  },
  creativity: {
    frascati: [
      { id: "f5", section: "§2.3 — Creativity", paragraph: "2.3.1", excerpt: "R&D activity must involve a creative effort — it must be based on original concepts and hypotheses, not routine or obvious extensions of existing knowledge." },
    ],
    documents: [
      { id: "d6", fileName: "design_rationale.pdf", page: 3, section: "2.1 Multi-objective Formulation", excerpt: "We reformulate architecture search as a Pareto optimization across accuracy, latency, and memory, using a novel encoding scheme that outperforms cell-based representations by 3× in search efficiency." },
      { id: "d7", fileName: "technical_spec_v3.pdf", page: 15, section: "3.4 Encoding Scheme", excerpt: "The graph-based encoding allows representation of skip connections and variable kernel sizes in a continuous space, enabling gradient-based exploration." },
    ],
  },
  systematic: {
    frascati: [
      { id: "f6", section: "§2.5 — Systematic basis", paragraph: "2.5.2", excerpt: "R&D must be conducted on a systematic basis — planned with records of both the process followed and the outcome, including documentation of negative results." },
    ],
    documents: [
      { id: "d8", fileName: "experiment_log_q3.pdf", page: 1, section: "1.1 Methodology", excerpt: "All experiments follow a pre-registered protocol with defined hypotheses. Each architecture variant is benchmarked against ImageNet and CIFAR-100 with 5-fold cross validation." },
      { id: "d9", fileName: "ablation_study.pdf", page: 6, section: "3.2 Statistical Analysis", excerpt: "Results are reported with 95% confidence intervals. The Wilcoxon signed-rank test is used for pairwise comparisons between search strategies." },
    ],
  },
  transferable: {
    frascati: [
      { id: "f7", section: "§2.6 — Transferable outcomes", paragraph: "2.6.1", excerpt: "R&D should yield results that could in principle be reproduced or transferred. Knowledge generated should be potentially applicable beyond the specific project context." },
    ],
    documents: [
      { id: "d10", fileName: "technical_spec_v3.pdf", page: 30, section: "7.1 Generalization", excerpt: "The hybrid search methodology is architecture-agnostic and has been validated on CNN, transformer, and hybrid topologies. The encoding scheme transfers directly to FPGA and mobile deployment targets." },
      { id: "d11", fileName: "dissemination_plan.pdf", page: 2, section: "2.1 Publications", excerpt: "Two conference papers submitted (NeurIPS, ICML) detailing the methodology with full reproducibility artifacts including code, data, and pre-trained checkpoints." },
    ],
  },
};
