interface StatusBadgeProps {
  status: "draft" | "analyzing" | "completed";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles = {
    draft: "bg-muted text-muted-foreground border border-border",
    analyzing: "bg-primary/8 text-primary border border-primary/20",
    completed: "bg-green-50 text-green-700 border border-green-200",
  };

  return (
    <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-sm ${styles[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
