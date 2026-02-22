import { ReactNode } from "react";

interface WidgetHeaderProps {
  icon: ReactNode;
  title: string;
  accentClass?: string;
  badge?: string;
}

export const WidgetHeader = ({ icon, title, accentClass = "text-primary", badge }: WidgetHeaderProps) => (
  <div className="flex items-center gap-2 mb-4">
    <span className={accentClass}>{icon}</span>
    <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground/80">{title}</h3>
    {badge && (
      <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted ${accentClass}`}>
        {badge}
      </span>
    )}
  </div>
);
