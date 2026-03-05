interface RdLevelBadgeProps {
  level: number;
  size?: "sm" | "md" | "lg";
}

const RdLevelBadge = ({ level, size = "md" }: RdLevelBadgeProps) => {
  const getColor = () => {
    if (level >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (level >= 60) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-500 bg-red-50 border-red-200";
  };

  const sizeClasses = {
    sm: "text-[10px] px-1.5 py-0.5",
    md: "text-xs px-2 py-1",
    lg: "text-sm px-3 py-1.5 font-semibold",
  };

  return (
    <span className={`inline-flex items-center rounded-sm border font-medium ${getColor()} ${sizeClasses[size]}`}>
      {level}% R&D
    </span>
  );
};

export default RdLevelBadge;
