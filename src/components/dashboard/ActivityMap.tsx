import { Clock } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { WidgetHeader } from "./WidgetHeader";
import type { ActivitySlot } from "@/lib/mockData";

const getColor = (intensity: number) => {
  if (intensity < 0.2) return "bg-secondary/40";
  if (intensity < 0.4) return "bg-buying/20";
  if (intensity < 0.6) return "bg-buying/40";
  if (intensity < 0.8) return "bg-buying/60";
  return "bg-buying/90";
};

export const ActivityMap = ({ activity }: { activity: ActivitySlot[] }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const hours = ["8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

  return (
    <GlassCard glowClass="widget-glow-heatmap" delay={0.45}>
      <WidgetHeader icon={<Clock className="w-4 h-4" />} title="Best Calling Hours" accentClass="text-heatmap" />

      <div className="overflow-x-auto">
        <div className="min-w-[300px]">
          {/* Header row */}
          <div className="flex gap-1 mb-1.5 pl-10">
            {hours.map(h => (
              <div key={h} className="flex-1 text-center text-[8px] text-muted-foreground">{h}</div>
            ))}
          </div>

          {/* Data rows */}
          {days.map(day => (
            <div key={day} className="flex gap-1 mb-1 items-center">
              <span className="w-8 text-[10px] text-muted-foreground font-medium text-right mr-1">{day}</span>
              {hours.map(hour => {
                const slot = activity.find(a => a.day === day && a.hour === hour);
                return (
                  <div
                    key={`${day}-${hour}`}
                    className={`flex-1 h-6 rounded-sm ${getColor(slot?.intensity || 0)} transition-colors cursor-pointer hover:ring-1 hover:ring-foreground/20`}
                    title={`${day} ${hour}: ${Math.round((slot?.intensity || 0) * 100)}% success rate`}
                  />
                );
              })}
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-3">
            <span className="text-[9px] text-muted-foreground">Low</span>
            {[0.1, 0.3, 0.5, 0.7, 0.9].map(v => (
              <div key={v} className={`w-4 h-3 rounded-sm ${getColor(v)}`} />
            ))}
            <span className="text-[9px] text-muted-foreground">High</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
