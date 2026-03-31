interface StatusBadgeProps {
  status: "draft" | "analyzing" | "completed";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles = {
    draft: "bg-neutral-100 text-neutral-500 border border-neutral-200",
    analyzing: "bg-info-muted text-info-foreground border border-info/20",
    completed: "bg-success-muted text-success-foreground border border-success/20",
  };

  return (
    <span className={`text-micro uppercase tracking-wider font-semibold px-2.5 py-1 rounded-lg ${styles[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
