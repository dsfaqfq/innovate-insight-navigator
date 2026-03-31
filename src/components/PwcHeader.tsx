const PwcHeader = () => {
  return (
    <header className="bg-pwc-black text-primary-foreground" style={{ boxShadow: 'var(--shadow-md)' }}>
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold text-sm font-display tracking-tight">
              pw
            </div>
            <span className="text-sm font-semibold tracking-wide font-display">R&D Accelerator</span>
          </div>
          <span className="text-micro px-2.5 py-1 rounded-sm bg-primary/12 text-primary font-semibold uppercase tracking-wider border border-primary/20">
            Wireframe
          </span>
        </div>
        <div className="flex items-center gap-4 text-caption text-muted-foreground">
          <span className="text-sidebar-foreground/60 font-medium">Acme Corp</span>
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-caption font-medium text-sidebar-foreground ring-1 ring-sidebar-border">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default PwcHeader;
