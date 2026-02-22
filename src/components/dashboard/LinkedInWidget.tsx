import { Linkedin, MessageSquare, TrendingUp } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { WidgetHeader } from "./WidgetHeader";
import type { LinkedInData } from "@/lib/mockData";

export const LinkedInWidget = ({ data }: { data: LinkedInData }) => {
  const activityColor = data.activityLevel === "high" ? "bg-buying" : data.activityLevel === "medium" ? "bg-pain" : "bg-muted-foreground";

  return (
    <GlassCard glowClass="widget-glow-linkedin" delay={0.1}>
      <WidgetHeader icon={<Linkedin className="w-4 h-4" />} title="LinkedIn Intel" accentClass="text-linkedin" badge={data.activityLevel.toUpperCase()} />
      
      <div className="space-y-3">
        <div>
          <p className="text-base font-semibold text-foreground">{data.name}</p>
          <p className="text-xs text-muted-foreground">{data.position}</p>
          <p className="text-xs text-muted-foreground">Tenure: {data.tenure}</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MessageSquare className="w-3 h-3 text-linkedin" />
          {data.mutualConnections} mutual connections
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Activity</span>
          <div className={`w-2 h-2 rounded-full ${activityColor} animate-pulse-glow`} />
        </div>

        <div className="space-y-2 pt-1">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Recent Posts</p>
          {data.recentPosts.map((post, i) => (
            <div key={i} className="bg-secondary/60 rounded-lg p-2.5">
              <p className="text-xs text-foreground/80 line-clamp-2">{post.text}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] text-muted-foreground">{post.date}</span>
                <TrendingUp className="w-3 h-3 text-linkedin" />
                <span className="text-[10px] text-muted-foreground">{post.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};
