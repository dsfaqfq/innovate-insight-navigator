const PwcHeader = () => {
  return (
    <header className="bg-pwc-black text-primary-foreground shadow-md">
      <div className="flex items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground font-bold text-sm tracking-tight">
              pw
            </div>
            <span className="text-sm font-semibold tracking-wide">R&D Accelerator</span>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded bg-primary/15 text-primary font-medium uppercase tracking-wider border border-primary/20">
            Wireframe
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="text-sidebar-foreground/70">Acme Corp</span>
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-[11px] font-medium text-primary-foreground ring-1 ring-sidebar-border">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default PwcHeader;
