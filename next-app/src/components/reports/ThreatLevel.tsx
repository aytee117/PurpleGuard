type Level = "safe" | "low" | "medium" | "high" | "critical";

const LEVELS: Record<Level, { step: number; color: string; label: string }> = {
  safe: { step: 1, color: "var(--threat-safe)", label: "SAFE" },
  low: { step: 2, color: "var(--threat-low)", label: "LOW" },
  medium: { step: 3, color: "var(--threat-medium)", label: "MEDIUM" },
  high: { step: 4, color: "var(--threat-high)", label: "HIGH" },
  critical: { step: 5, color: "var(--threat-critical)", label: "CRITICAL" },
};

interface ThreatLevelProps {
  level: Level;
  size?: "sm" | "default";
}

export function ThreatLevel({ level, size = "default" }: ThreatLevelProps) {
  const { step, color, label } = LEVELS[level];
  const unit = size === "sm" ? 2 : 2.5;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-end gap-0.5">
        {[1, 2, 3, 4, 5].map((bar) => (
          <span
            key={bar}
            className="w-1.5 rounded-sm"
            style={{
              height: `${6 + bar * unit}px`,
              backgroundColor: bar <= step ? color : "var(--border)",
            }}
          />
        ))}
      </div>
      <span className="pg-eyebrow text-[11px] font-semibold" style={{ color }}>
        {label}
      </span>
    </div>
  );
}
