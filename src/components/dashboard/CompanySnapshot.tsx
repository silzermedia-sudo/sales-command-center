import { Building2, Users, DollarSign, MapPin, Newspaper } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { WidgetHeader } from "./WidgetHeader";
import type { CompanyData } from "@/lib/mockData";

export const CompanySnapshot = ({ data }: { data: CompanyData }) => (
  <GlassCard glowClass="widget-glow-company" delay={0.15}>
    <WidgetHeader icon={<Building2 className="w-4 h-4" />} title="Company Snapshot" accentClass="text-muted-foreground" />
    
    <div className="grid grid-cols-2 gap-3 mb-4">
      {[
        { icon: <Building2 className="w-3 h-3" />, label: "Industry", value: data.industry },
        { icon: <Users className="w-3 h-3" />, label: "Employees", value: data.employees },
        { icon: <DollarSign className="w-3 h-3" />, label: "Revenue", value: data.revenue },
        { icon: <MapPin className="w-3 h-3" />, label: "HQ", value: data.hq },
      ].map((item, i) => (
        <div key={i} className="bg-secondary/60 rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-muted-foreground">{item.icon}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</span>
          </div>
          <p className="text-xs font-medium text-foreground">{item.value}</p>
        </div>
      ))}
    </div>

    <div className="mb-3">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Locations</p>
      <div className="flex flex-wrap gap-1.5">
        {data.locations.map((loc, i) => (
          <span key={i} className="text-[10px] bg-secondary/80 px-2 py-1 rounded-md text-foreground/70">{loc}</span>
        ))}
      </div>
    </div>

    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <Newspaper className="w-3 h-3 text-muted-foreground" />
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Recent News</p>
      </div>
      {data.recentNews.map((news, i) => (
        <div key={i} className="flex justify-between items-start py-1.5 border-b border-border/50 last:border-0">
          <p className="text-xs text-foreground/80 pr-2">{news.title}</p>
          <span className="text-[10px] text-muted-foreground whitespace-nowrap">{news.date}</span>
        </div>
      ))}
    </div>
  </GlassCard>
);
