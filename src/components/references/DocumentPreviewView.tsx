import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { BookOpen, FileText, Eye, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import type { ProjectReferences, UserDocReference } from "@/lib/referenceData";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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

const DocumentPreviewView = ({ criteria, references }: Props) => {
  const [selectedCriterion, setSelectedCriterion] = useState<string>(Object.keys(criteria)[0]);
  const [selectedDoc, setSelectedDoc] = useState<UserDocReference | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState(1.0);

  const refs = references[selectedCriterion];
  const userDocs = refs?.userDocs ?? [];

  const handleSelectCriterion = (key: string) => {
    setSelectedCriterion(key);
    const newRefs = references[key];
    if (newRefs?.userDocs?.length) {
      const doc = newRefs.userDocs[0];
      setSelectedDoc(doc);
      setCurrentPage(doc.pageNumber ?? 1);
    } else {
      setSelectedDoc(null);
      setCurrentPage(1);
    }
    setNumPages(0);
  };

  const handleSelectDoc = (doc: UserDocReference) => {
    const isSameFile = selectedDoc?.filePath === doc.filePath;
    setSelectedDoc(doc);
    setCurrentPage(doc.pageNumber ?? 1);
    if (!isSameFile) setNumPages(0);
  };

  const onDocumentLoadSuccess = useCallback(({ numPages: n }: { numPages: number }) => {
    setNumPages(n);
  }, []);

  const isPdf = selectedDoc?.type === "pdf" && selectedDoc?.filePath;

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

      <div className="grid grid-cols-5 gap-6" style={{ minHeight: 700 }}>
        {/* Left: Criterion summary + document list */}
        <div className="col-span-2 space-y-4 overflow-y-auto" style={{ maxHeight: 700 }}>
          {/* AI justification */}
          <div className="border border-border rounded-sm bg-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              {criteriaLabels[selectedCriterion]}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {criteria[selectedCriterion]}
            </p>
          </div>

          {/* Frascati refs */}
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
                      <FileText size={12} style={{ color: "hsl(var(--pwc-tangerine))" }} />
                      <span className="text-xs font-medium text-foreground">{doc.documentName}</span>
                      <span className="text-[10px] text-muted-foreground ml-auto">{doc.page}</span>
                    </div>
                    {doc.section && (
                      <span className="text-[10px] text-muted-foreground">{doc.section}</span>
                    )}
                    {doc.type !== "pdf" && (
                      <span className="text-[10px] text-muted-foreground italic ml-1">
                        (no preview)
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Excerpt callout */}
          {selectedDoc && (
            <div
              className="rounded-sm px-3 py-2.5 border"
              style={{
                borderColor: "hsl(var(--pwc-tangerine) / 0.3)",
                backgroundColor: "hsl(var(--pwc-tangerine) / 0.04)",
              }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <Eye size={11} style={{ color: "hsl(var(--pwc-tangerine))" }} />
                <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                  Referenced Excerpt
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                "{selectedDoc.excerpt}"
              </p>
            </div>
          )}
        </div>

        {/* Right: PDF viewer */}
        <div className="col-span-3 border border-border rounded-sm bg-card flex flex-col overflow-hidden">
          {isPdf ? (
            <>
              {/* Toolbar */}
              <div
                className="flex items-center justify-between px-4 py-2 border-b border-border shrink-0"
                style={{ backgroundColor: "hsl(var(--pwc-tangerine) / 0.06)" }}
              >
                <div className="flex items-center gap-2">
                  <Eye size={13} style={{ color: "hsl(var(--pwc-tangerine))" }} />
                  <span className="text-xs font-semibold text-foreground">
                    {selectedDoc.documentName}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase font-medium">
                    PDF
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {/* Zoom */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setScale((s) => Math.max(0.5, s - 0.15))}
                      className="p-1 rounded-sm hover:bg-muted text-foreground"
                    >
                      <ZoomOut size={13} />
                    </button>
                    <span className="text-[10px] text-muted-foreground font-medium w-10 text-center">
                      {Math.round(scale * 100)}%
                    </span>
                    <button
                      onClick={() => setScale((s) => Math.min(2, s + 0.15))}
                      className="p-1 rounded-sm hover:bg-muted text-foreground"
                    >
                      <ZoomIn size={13} />
                    </button>
                  </div>

                  {/* Page nav */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage <= 1}
                      className="p-1 rounded-sm hover:bg-muted disabled:opacity-30 text-foreground"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <span className="text-[11px] text-muted-foreground font-medium">
                      {currentPage} / {numPages || "…"}
                    </span>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
                      disabled={currentPage >= numPages}
                      className="p-1 rounded-sm hover:bg-muted disabled:opacity-30 text-foreground"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Referenced page indicator */}
              {selectedDoc.pageNumber && currentPage === selectedDoc.pageNumber && (
                <div
                  className="flex items-center gap-2 px-4 py-1.5 text-[11px] font-medium border-b"
                  style={{
                    backgroundColor: "hsl(var(--pwc-tangerine) / 0.08)",
                    color: "hsl(var(--pwc-tangerine))",
                    borderColor: "hsl(var(--pwc-tangerine) / 0.2)",
                  }}
                >
                  <Eye size={11} />
                  Viewing referenced page for {criteriaLabels[selectedCriterion]}
                  {selectedDoc.section && <span>— {selectedDoc.section}</span>}
                </div>
              )}

              {/* PDF render area */}
              <div className="flex-1 overflow-auto flex justify-center bg-muted/30 p-4">
                <Document
                  file={selectedDoc.filePath}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <div className="flex items-center justify-center h-64">
                      <span className="text-xs text-muted-foreground">Loading PDF…</span>
                    </div>
                  }
                  error={
                    <div className="flex items-center justify-center h-64">
                      <span className="text-xs text-destructive">Failed to load PDF</span>
                    </div>
                  }
                >
                  <Page
                    pageNumber={currentPage}
                    scale={scale}
                    className="shadow-lg"
                    loading={
                      <div className="flex items-center justify-center h-64 w-[500px]">
                        <span className="text-xs text-muted-foreground">Rendering page…</span>
                      </div>
                    }
                  />
                </Document>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <FileText size={32} className="mx-auto mb-3 text-muted-foreground/40" />
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {selectedDoc ? "Preview not available" : "No document selected"}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  {selectedDoc
                    ? `${selectedDoc.type.toUpperCase()} files cannot be previewed. Select a PDF document to view it.`
                    : "Select a project document from the left to preview the referenced page"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewView;
