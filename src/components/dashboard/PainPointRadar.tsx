import { Target, HelpCircle, ShieldAlert } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { WidgetHeader } from "./WidgetHeader";
import type { PainPoint } from "@/lib/mockData";

export const PainPointRadar = ({ painPoints }: { painPoints: PainPoint[] }) => (
  <GlassCard glowClass="widget-glow-pain" delay={0.3}>
    <WidgetHeader icon={<Target className="w-4 h-4" />} title="Pain Point Radar" accentClass="text-pain" />

    <div className="space-y-3">
      {painPoints.map((pp, i) => (
        <div key={i} className="bg-secondary/60 rounded-lg p-3">
          <div className="flex items-start gap-2 mb-2">
            <Target className="w-3 h-3 text-pain mt-0.5 shrink-0" />
            <p className="text-xs font-medium text-foreground/90">{pp.pain}</p>
          </div>
          <div className="flex items-start gap-2 mb-1.5 pl-5">
            <HelpCircle className="w-3 h-3 text-primary mt-0.5 shrink-0" />
            <p className="text-[11px] text-muted-foreground italic">{pp.question}</p>
          </div>
          <div className="flex items-start gap-2 pl-5">
            <ShieldAlert className="w-3 h-3 text-destructive mt-0.5 shrink-0" />
            <p className="text-[11px] text-muted-foreground">{pp.objection}</p>
          </div>
        </div>
      ))}
    </div>
  </GlassCard>
);
