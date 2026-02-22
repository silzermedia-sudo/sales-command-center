import { Route, ArrowDown } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { WidgetHeader } from "./WidgetHeader";
import type { GuideStep } from "@/lib/mockData";

export const Gespraechsleitfaden = ({ steps }: { steps: GuideStep[] }) => (
  <GlassCard glowClass="widget-glow-guide" delay={0.35}>
    <WidgetHeader icon={<Route className="w-4 h-4" />} title="Gesprächsleitfaden" accentClass="text-guide" />

    <div className="relative">
      {steps.map((step, i) => (
        <div key={i} className="relative flex gap-3 pb-4 last:pb-0">
          {/* Vertical line */}
          {i < steps.length - 1 && (
            <div className="absolute left-[11px] top-6 bottom-0 w-px bg-guide/20" />
          )}
          {/* Dot */}
          <div className="relative z-10 w-6 h-6 rounded-full bg-guide/20 flex items-center justify-center shrink-0 mt-0.5">
            <div className="w-2 h-2 rounded-full bg-guide" />
          </div>
          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-guide mb-1">{step.phase}</p>
            <p className="text-xs text-foreground/80 leading-relaxed">{step.content}</p>
          </div>
        </div>
      ))}
    </div>
  </GlassCard>
);
