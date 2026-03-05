export interface Project {
  id: string;
  name: string;
  description: string;
  program: string;
  tags: string[];
  rdLevel: number;
  status: "draft" | "analyzing" | "completed";
  documentsCount: number;
  lastUpdated: string;
  criteria: {
    novelty: number;
    uncertainty: number;
    creativity: number;
    systematic: number;
    transferable: number;
  };
}

export interface Program {
  id: string;
  name: string;
  description: string;
  projectCount: number;
  avgRdLevel: number;
  color: string;
}

export const programs: Program[] = [
  { id: "p1", name: "AI & Machine Learning", description: "Projects exploring novel ML architectures and applications", projectCount: 4, avgRdLevel: 78, color: "hsl(var(--pwc-orange))" },
  { id: "p2", name: "Green Energy", description: "Sustainable energy R&D initiatives", projectCount: 3, avgRdLevel: 65, color: "hsl(var(--pwc-tangerine))" },
  { id: "p3", name: "Biotech Research", description: "Biotechnology and pharmaceutical innovations", projectCount: 3, avgRdLevel: 82, color: "hsl(var(--pwc-rose))" },
  { id: "p4", name: "Advanced Materials", description: "Novel material science research projects", projectCount: 2, avgRdLevel: 71, color: "hsl(18, 60%, 55%)" },
];

export const projects: Project[] = [
  { id: "1", name: "Neural Architecture Search v2", description: "Automated discovery of optimal neural network topologies for edge deployment", program: "AI & Machine Learning", tags: ["AI & Machine Learning", "Optimization", "Edge Computing"], rdLevel: 85, status: "completed", documentsCount: 12, lastUpdated: "2026-02-28", criteria: { novelty: 90, uncertainty: 80, creativity: 85, systematic: 88, transferable: 72 } },
  { id: "2", name: "Federated Learning Framework", description: "Privacy-preserving distributed ML training across organizational boundaries", program: "AI & Machine Learning", tags: ["AI & Machine Learning", "Privacy", "Distributed Systems"], rdLevel: 72, status: "completed", documentsCount: 8, lastUpdated: "2026-02-20", criteria: { novelty: 70, uncertainty: 75, creativity: 68, systematic: 80, transferable: 65 } },
  { id: "3", name: "LLM Fine-tuning Pipeline", description: "Domain-specific fine-tuning of large language models for legal document analysis", program: "AI & Machine Learning", tags: ["AI & Machine Learning", "NLP", "Legal Tech"], rdLevel: 68, status: "analyzing", documentsCount: 5, lastUpdated: "2026-03-01", criteria: { novelty: 65, uncertainty: 70, creativity: 60, systematic: 75, transferable: 70 } },
  { id: "4", name: "Explainable AI Module", description: "Interpretability layer for black-box models in regulated industries", program: "AI & Machine Learning", tags: ["AI & Machine Learning", "Compliance"], rdLevel: 88, status: "completed", documentsCount: 15, lastUpdated: "2026-01-15", criteria: { novelty: 92, uncertainty: 85, creativity: 90, systematic: 82, transferable: 88 } },
  { id: "5", name: "Solid-State Battery Prototype", description: "Next-gen solid-state lithium batteries with improved energy density", program: "Green Energy", tags: ["Green Energy", "Battery Tech", "Materials"], rdLevel: 76, status: "completed", documentsCount: 20, lastUpdated: "2026-02-10", criteria: { novelty: 80, uncertainty: 78, creativity: 70, systematic: 85, transferable: 68 } },
  { id: "6", name: "Solar Cell Efficiency Study", description: "Perovskite-silicon tandem cells exceeding 30% efficiency", program: "Green Energy", tags: ["Green Energy", "Solar", "Materials"], rdLevel: 60, status: "completed", documentsCount: 9, lastUpdated: "2026-01-28", criteria: { novelty: 55, uncertainty: 65, creativity: 58, systematic: 70, transferable: 52 } },
  { id: "7", name: "Hydrogen Storage System", description: "Metal-organic frameworks for ambient hydrogen storage", program: "Green Energy", tags: ["Green Energy", "Hydrogen", "Materials"], rdLevel: 58, status: "draft", documentsCount: 3, lastUpdated: "2026-03-02", criteria: { novelty: 60, uncertainty: 55, creativity: 50, systematic: 65, transferable: 60 } },
  { id: "8", name: "mRNA Delivery Mechanism", description: "Lipid nanoparticle optimization for targeted mRNA delivery", program: "Biotech Research", tags: ["Biotech Research", "Drug Delivery", "Nanotech"], rdLevel: 91, status: "completed", documentsCount: 25, lastUpdated: "2026-02-18", criteria: { novelty: 95, uncertainty: 88, creativity: 92, systematic: 90, transferable: 85 } },
  { id: "9", name: "CRISPR Screening Platform", description: "High-throughput CRISPR-based genetic screening for drug targets", program: "Biotech Research", tags: ["Biotech Research", "Genomics", "Drug Discovery"], rdLevel: 82, status: "analyzing", documentsCount: 14, lastUpdated: "2026-02-25", criteria: { novelty: 85, uncertainty: 80, creativity: 78, systematic: 88, transferable: 80 } },
  { id: "10", name: "Synthetic Biology Toolkit", description: "Standardized biological parts for synthetic organism design", program: "Biotech Research", tags: ["Biotech Research", "Synthetic Biology"], rdLevel: 74, status: "completed", documentsCount: 11, lastUpdated: "2026-01-30", criteria: { novelty: 75, uncertainty: 72, creativity: 80, systematic: 70, transferable: 72 } },
  { id: "11", name: "Graphene Composite", description: "Graphene-reinforced polymer composites for aerospace applications", program: "Advanced Materials", tags: ["Advanced Materials", "Aerospace", "Nanotech"], rdLevel: 79, status: "completed", documentsCount: 16, lastUpdated: "2026-02-05", criteria: { novelty: 78, uncertainty: 82, creativity: 75, systematic: 80, transferable: 78 } },
  { id: "12", name: "Self-Healing Polymer", description: "Autonomous damage repair in structural polymer matrices", program: "Advanced Materials", tags: ["Advanced Materials", "Smart Materials"], rdLevel: 63, status: "draft", documentsCount: 4, lastUpdated: "2026-03-03", criteria: { novelty: 68, uncertainty: 60, creativity: 65, systematic: 58, transferable: 62 } },
];
