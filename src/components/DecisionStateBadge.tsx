import { Sparkles, UserCheck, Clock, AlertTriangle, XCircle } from "lucide-react";

export type DecisionState =
  | "ai-generated"
  | "human-overridden"
  | "pending-review";

interface DecisionStateBadgeProps {
  state: DecisionState;
  /** Optional: show an "Override" CTA button alongside the badge */
  onOverride?: () => void;
}

const stateConfig: Record<
  DecisionState,
  {
    label: string;
    icon: typeof Sparkles;
    containerClass: string;
  }
> = {
  "ai-generated": {
    label: "AI-Generated",
    icon: Sparkles,
    containerClass: "bg-secondary-muted text-secondary border-secondary/20",
  },
  "human-overridden": {
    label: "Human Overridden",
    icon: UserCheck,
    containerClass: "bg-success-muted text-success-foreground border-success/20",
  },
  "pending-review": {
    label: "Pending Review",
    icon: Clock,
    containerClass: "bg-warning-muted text-warning-foreground border-warning/20",
  },
};

const DecisionStateBadge = ({ state, onOverride }: DecisionStateBadgeProps) => {
  const config = stateConfig[state];
  const Icon = config.icon;

  return (
    <div className="inline-flex items-center gap-2">
      <span
        className={`inline-flex items-center gap-1.5 text-micro uppercase tracking-wider font-semibold px-2.5 py-1 rounded-lg border ${config.containerClass}`}
      >
        <Icon size={11} />
        {config.label}
      </span>

      {/* Override CTA — uses primary (orange) sparingly */}
      {state === "ai-generated" && onOverride && (
        <button
          onClick={onOverride}
          className="text-micro font-semibold px-2.5 py-1 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Override
        </button>
      )}
    </div>
  );
};

export default DecisionStateBadge;
