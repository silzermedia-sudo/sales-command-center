import { TrendingUp, Rocket, Banknote, Activity } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { WidgetHeader } from "./WidgetHeader";
import type { BuyingSignalData } from "@/lib/mockData";

export const BuyingSignals = ({ data }: { data: BuyingSignalData }) => (
  <GlassCard glowClass="widget-glow-buying" delay={0.2}>
    <WidgetHeader icon={<TrendingUp className="w-4 h-4" />} title="Buying Signals" accentClass="text-buying" badge={`${data.confidenceScore}%`} />

    <div className="space-y-3">
      {[
        { icon: <Activity className="w-3.5 h-3.5" />, label: "Hiring", value: data.hiring.label, trend: data.hiring.trend },
        { icon: <Rocket className="w-3.5 h-3.5" />, label: "Expansion", value: data.expansion },
        { icon: <Banknote className="w-3.5 h-3.5" />, label: "Funding", value: data.funding },
        { icon: <TrendingUp className="w-3.5 h-3.5" />, label: "Social", value: data.socialSpikes },
      ].map((signal, i) => (
        <div key={i} className="bg-secondary/60 rounded-lg p-3 flex items-start gap-3">
          <span className="text-buying mt-0.5">{signal.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{signal.label}</p>
            <p className="text-xs text-foreground/90 mt-0.5">{signal.value}</p>
          </div>
          {signal.trend && (
            <TrendingUp className={`w-3 h-3 mt-1 ${signal.trend === "up" ? "text-buying" : "text-destructive"}`} />
          )}
        </div>
      ))}

      <div className="pt-2">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Confidence Score</span>
          <span className="text-xs font-bold text-buying">{data.confidenceScore}%</span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-buying rounded-full transition-all duration-1000" style={{ width: `${data.confidenceScore}%` }} />
        </div>
      </div>
    </div>
  </GlassCard>
);
