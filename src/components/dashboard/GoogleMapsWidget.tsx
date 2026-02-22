import { MapPin, Navigation } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { WidgetHeader } from "./WidgetHeader";
import type { LocationData } from "@/lib/mockData";

export const GoogleMapsWidget = ({ locations }: { locations: LocationData[] }) => (
  <GlassCard glowClass="widget-glow-company" delay={0.4} className="relative">
    <WidgetHeader icon={<MapPin className="w-4 h-4" />} title="Office Locations" accentClass="text-muted-foreground" />

    {/* Mock map background */}
    <div className="relative rounded-xl overflow-hidden bg-secondary/80 h-48 mb-3">
      <div className="absolute inset-0 opacity-20">
        {/* Grid lines simulating map */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      {/* Mock pins */}
      {locations.map((loc, i) => {
        const positions = [
          { left: "25%", top: "40%" },
          { left: "35%", top: "60%" },
          { left: "65%", top: "30%" },
          { left: "72%", top: "35%" },
        ];
        const pos = positions[i] || { left: "50%", top: "50%" };
        return (
          <div
            key={i}
            className="absolute transform -translate-x-1/2 -translate-y-full group cursor-pointer"
            style={pos}
          >
            <div className="relative">
              <MapPin className={`w-5 h-5 ${loc.type === "hq" ? "text-primary" : "text-muted-foreground"} drop-shadow-lg`} />
              {loc.type === "hq" && (
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              )}
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-card/95 backdrop-blur-sm px-2 py-1 rounded text-[9px] text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-border/50">
              {loc.name}
            </div>
          </div>
        );
      })}
    </div>

    <div className="space-y-1.5">
      {locations.map((loc, i) => (
        <div key={i} className="flex items-center gap-2 py-1">
          <MapPin className={`w-3 h-3 shrink-0 ${loc.type === "hq" ? "text-primary" : "text-muted-foreground"}`} />
          <span className="text-xs text-foreground/80 flex-1">{loc.name}</span>
          {loc.type === "hq" && (
            <span className="text-[9px] bg-primary/15 text-primary px-1.5 py-0.5 rounded-md font-medium">HQ</span>
          )}
        </div>
      ))}
    </div>
  </GlassCard>
);
