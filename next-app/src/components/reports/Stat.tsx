interface StatProps {
  label: string;
  value: string;
  hint?: string;
}

export function Stat({ label, value, hint }: StatProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-display text-3xl font-bold text-foreground">{value}</span>
      <span className="text-sm font-medium text-foreground">{label}</span>
      {hint && <span className="pg-eyebrow text-[11px] text-muted-foreground">{hint}</span>}
    </div>
  );
}
