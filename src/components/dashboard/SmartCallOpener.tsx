import { Sparkles, RefreshCw } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { WidgetHeader } from "./WidgetHeader";
import { motion } from "framer-motion";
import type { CallOpener } from "@/lib/mockData";

interface SmartCallOpenerProps {
  openers: CallOpener[];
  onRegenerate: () => void;
}

const typeLabels: Record<CallOpener["type"], string> = {
  personalized: "✨ Personalized",
  roi: "💰 ROI",
  provocative: "🔥 Provocative",
  trust: "🤝 Trust",
};

const typeColors: Record<CallOpener["type"], string> = {
  personalized: "border-opener/30",
  roi: "border-buying/30",
  provocative: "border-pain/30",
  trust: "border-primary/30",
};

export const SmartCallOpener = ({ openers, onRegenerate }: SmartCallOpenerProps) => (
  <GlassCard glowClass="widget-glow-opener" delay={0.25}>
    <WidgetHeader icon={<Sparkles className="w-4 h-4" />} title="Smart Call Openers" accentClass="text-opener" />

    <div className="space-y-2.5 mb-4">
      {openers.map((opener, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.08 }}
          className={`bg-secondary/60 rounded-lg p-3 border-l-2 ${typeColors[opener.type]}`}
        >
          <span className="text-[10px] font-semibold text-muted-foreground">{typeLabels[opener.type]}</span>
          <p className="text-xs text-foreground/85 mt-1 leading-relaxed">{opener.text}</p>
        </motion.div>
      ))}
    </div>

    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onRegenerate}
      className="w-full flex items-center justify-center gap-2 bg-opener/15 hover:bg-opener/25 text-opener font-medium rounded-xl py-2.5 text-xs transition-colors"
    >
      <RefreshCw className="w-3.5 h-3.5" />
      Regenerate Openers
    </motion.button>
  </GlassCard>
);
