interface StatusBadgeProps {
  status: "draft" | "analyzing" | "completed";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles = {
    draft: "bg-muted text-muted-foreground border border-border",
    analyzing: "bg-primary/8 text-primary border border-primary/20",
    completed: "bg-success-muted text-success-foreground border border-success/20",
  };

  return (
    <span className={`text-micro uppercase tracking-wider font-semibold px-2.5 py-1 rounded-sm ${styles[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
