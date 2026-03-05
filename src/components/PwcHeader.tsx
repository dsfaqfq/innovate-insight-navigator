const PwcHeader = () => {
  return (
    <header className="bg-pwc-black text-primary-foreground">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-bold text-sm">
              pw
            </div>
            <span className="text-sm font-semibold tracking-wide">R&D Accelerator</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-sm bg-primary/20 text-primary font-medium uppercase tracking-wider">
            Wireframe
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>Acme Corp</span>
          <div className="w-7 h-7 rounded-full bg-pwc-dark flex items-center justify-center text-[11px] font-medium text-primary-foreground">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default PwcHeader;
