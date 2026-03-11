export interface FrascatiReference {
  id: string;
  section: string;
  title: string;
  excerpt: string;
  page?: string;
}

export interface UserDocReference {
  id: string;
  documentName: string;
  type: "pdf" | "docx" | "xlsx" | "txt";
  excerpt: string;
  page?: string;
  pageNumber?: number;
  section?: string;
  filePath?: string;
}

export interface CriterionReferences {
  frascati: FrascatiReference[];
  userDocs: UserDocReference[];
}

export type ProjectReferences = Record<string, CriterionReferences>;

const frascatiBase: Record<string, FrascatiReference[]> = {
  novelty: [
    { id: "f1", section: "§2.1", title: "Novel vs. routine activities", excerpt: "R&D activities must aim at new findings or the use of new techniques, going beyond the current state of knowledge.", page: "p.28" },
    { id: "f2", section: "§2.6", title: "Distinguishing R&D from non-R&D", excerpt: "The novelty criterion requires that the project seeks to produce new knowledge or applies existing knowledge in a new way not previously attempted.", page: "p.44" },
  ],
  uncertainty: [
    { id: "f3", section: "§2.2", title: "Scientific or technological uncertainty", excerpt: "R&D exists when there is uncertainty about the outcome, the cost, or the time needed to achieve the objectives. The solution is not readily apparent.", page: "p.30" },
    { id: "f4", section: "§2.7", title: "Types of uncertainty in R&D", excerpt: "Uncertainty may concern the approach to be adopted, the feasibility of achieving the goal, or the resources required. It is not limited to technical feasibility alone.", page: "p.46" },
  ],
  creativity: [
    { id: "f5", section: "§2.3", title: "Creative effort", excerpt: "R&D requires creative effort by researchers with sufficient qualifications, involving non-routine intellectual activity.", page: "p.32" },
  ],
  systematic: [
    { id: "f6", section: "§2.4", title: "Systematic basis", excerpt: "R&D activity must be carried out on a systematic basis — planned with records of both the process followed and the outcome.", page: "p.34" },
    { id: "f7", section: "§2.4.1", title: "Documentation requirements", excerpt: "Systematic investigation implies the existence of project plans, budgets, records of methodology, and documented results including negative outcomes.", page: "p.35" },
  ],
  transferable: [
    { id: "f8", section: "§2.5", title: "Transferable or reproducible", excerpt: "R&D should lead to results that could potentially be transferred or reproduced, contributing to the stock of knowledge.", page: "p.38" },
  ],
};

const userDocsBase: Record<string, UserDocReference[]> = {
  novelty: [
    { id: "u1", documentName: "BIOCONTINUE.pdf", type: "pdf", excerpt: "Our approach departs from standard methods by introducing a hybrid evolutionary-gradient search that dynamically expands the architecture space during optimization.", page: "p.3", pageNumber: 3, section: "§3.1 - Approach", filePath: "/documents/BIOCONTINUE.pdf" },
    { id: "u2", documentName: "BIOSYNC.pdf", type: "pdf", excerpt: "Existing NAS frameworks (DARTS, ENAS, ProxylessNAS) all operate within fixed, predefined search spaces. No prior work combines evolutionary expansion with gradient descent.", page: "p.2", pageNumber: 2, section: "§2 - Prior Work", filePath: "/documents/BIOSYNC.pdf" },
    { id: "u3", documentName: "patent_landscape.xlsx", type: "xlsx", excerpt: "Patent search across USPTO, EPO, and WIPO databases returned zero results for 'dynamic search space expansion in neural architecture search'.", page: "Sheet 2" },
  ],
  uncertainty: [
    { id: "u4", documentName: "BIOWOMEN.pdf", type: "pdf", excerpt: "Experiments 14–23 failed to converge using standard crossover operators. Convergence was only achieved after developing a custom topology-aware crossover (Exp. 24).", page: "p.4", pageNumber: 4, section: "§5.2 - Failed Approaches", filePath: "/documents/BIOWOMEN.pdf" },
    { id: "u5", documentName: "BIOCONTINUE.pdf", type: "pdf", excerpt: "The feasibility of achieving sub-100ms inference latency on ARM Cortex-A78 while maintaining >92% accuracy was unknown at project inception.", page: "p.2", pageNumber: 2, section: "§2.4 - Constraints", filePath: "/documents/BIOCONTINUE.pdf" },
  ],
  creativity: [
    { id: "u6", documentName: "ELUNA.pdf", type: "pdf", excerpt: "The multi-objective encoding scheme was developed internally after standard approaches proved inadequate. It encodes topology, operations, and connectivity in a unified representation.", page: "p.3", pageNumber: 3, section: "§4.1 - Encoding Design", filePath: "/documents/ELUNA.pdf" },
  ],
  systematic: [
    { id: "u7", documentName: "MATRIX.pdf", type: "pdf", excerpt: "Each architecture variant was evaluated on ImageNet and CIFAR-100 with 5 seeds per configuration. Statistical significance was established using paired t-tests (p < 0.01).", page: "p.5", pageNumber: 5, section: "§6 - Evaluation Protocol", filePath: "/documents/MATRIX.pdf" },
    { id: "u8", documentName: "BIOWOMEN.pdf", type: "pdf", excerpt: "Complete experiment log covering 47 runs with hyperparameter settings, hardware configuration, and results including all failed attempts.", page: "p.1", pageNumber: 1, filePath: "/documents/BIOWOMEN.pdf" },
    { id: "u9", documentName: "BIOSYNC.pdf", type: "pdf", excerpt: "Systematic ablation removing each component individually confirms that both the evolutionary expansion and gradient refinement contribute meaningfully to final performance.", page: "p.3", pageNumber: 3, section: "§2 - Ablation Results", filePath: "/documents/BIOSYNC.pdf" },
  ],
  transferable: [
    { id: "u10", documentName: "BIOCONTINUE.pdf", type: "pdf", excerpt: "The search framework is parameterized to accept arbitrary hardware constraint profiles, enabling application to FPGA, mobile SoC, or server GPU targets.", page: "p.5", pageNumber: 5, section: "§7 - Generalization", filePath: "/documents/BIOCONTINUE.pdf" },
    { id: "u11", documentName: "ELUNA.pdf", type: "pdf", excerpt: "Public API documentation covering all configuration options, input formats, and extension points for custom search space definitions.", page: "p.1", pageNumber: 1, filePath: "/documents/ELUNA.pdf" },
  ],
};

export const projectReferences: Record<string, ProjectReferences> = {
  "1": {
    novelty: { frascati: frascatiBase.novelty, userDocs: userDocsBase.novelty },
    uncertainty: { frascati: frascatiBase.uncertainty, userDocs: userDocsBase.uncertainty },
    creativity: { frascati: frascatiBase.creativity, userDocs: userDocsBase.creativity },
    systematic: { frascati: frascatiBase.systematic, userDocs: userDocsBase.systematic },
    transferable: { frascati: frascatiBase.transferable, userDocs: userDocsBase.transferable },
  },
  "2": {
    novelty: { frascati: frascatiBase.novelty, userDocs: [userDocsBase.novelty[0]] },
    uncertainty: { frascati: frascatiBase.uncertainty, userDocs: [userDocsBase.uncertainty[0]] },
    creativity: { frascati: frascatiBase.creativity, userDocs: [userDocsBase.creativity[0]] },
    systematic: { frascati: frascatiBase.systematic, userDocs: [userDocsBase.systematic[0]] },
    transferable: { frascati: frascatiBase.transferable, userDocs: [userDocsBase.transferable[0]] },
  },
  "4": {
    novelty: { frascati: frascatiBase.novelty, userDocs: [userDocsBase.novelty[0]] },
    uncertainty: { frascati: frascatiBase.uncertainty, userDocs: [userDocsBase.uncertainty[0]] },
    creativity: { frascati: frascatiBase.creativity, userDocs: [userDocsBase.creativity[0]] },
    systematic: { frascati: frascatiBase.systematic, userDocs: [userDocsBase.systematic[0]] },
    transferable: { frascati: frascatiBase.transferable, userDocs: [userDocsBase.transferable[0]] },
  },
};
