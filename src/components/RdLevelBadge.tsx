interface RdLevelBadgeProps {
  level?: number;
  size?: "sm" | "md" | "lg";
}

const RdLevelBadge = ({ level, size = "md" }: RdLevelBadgeProps) => {
  if (level == null) {
    const sizeClasses = {
      sm: "text-micro px-1.5 py-0.5",
      md: "text-caption px-2 py-1",
      lg: "text-body px-3 py-1.5 font-semibold",
    };
    return (
      <span className={`inline-flex items-center rounded-sm border font-medium text-muted-foreground bg-muted border-border ${sizeClasses[size]}`}>
        Pending
      </span>
    );
  }

  const getColor = () => {
    if (level >= 80) return "text-success-foreground bg-success-muted border-success/20";
    if (level >= 60) return "text-warning-foreground bg-warning-muted border-warning/20";
    return "text-destructive bg-destructive/8 border-destructive/20";
  };

  const sizeClasses = {
    sm: "text-micro px-1.5 py-0.5",
    md: "text-caption px-2 py-1",
    lg: "text-body px-3 py-1.5 font-semibold",
  };

  return (
    <span className={`inline-flex items-center rounded-sm border font-medium ${getColor()} ${sizeClasses[size]}`}>
      {level}% R&D
    </span>
  );
};

export default RdLevelBadge;
