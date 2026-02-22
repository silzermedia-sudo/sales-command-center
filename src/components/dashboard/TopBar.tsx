import { Search, Zap, User } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import type { ProspectData } from "@/lib/mockData";

interface TopBarProps {
  onGenerate: (data: ProspectData) => void;
  isLoading: boolean;
}

export const TopBar = ({ onGenerate, isLoading }: TopBarProps) => {
  const [form, setForm] = useState<ProspectData>({
    name: "",
    company: "",
    website: "",
    linkedinUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(form);
  };

  return (
    <GlassCard glowClass="widget-glow-input" className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">Cold Call Preparer</h1>
            <p className="text-[11px] text-muted-foreground">Sales Intelligence Mission Control</p>
          </div>
        </div>
        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <input
          placeholder="Prospect Name"
          value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          className="bg-secondary/80 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <input
          placeholder="Company Name"
          value={form.company}
          onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
          className="bg-secondary/80 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <input
          placeholder="Website"
          value={form.website}
          onChange={e => setForm(p => ({ ...p, website: e.target.value }))}
          className="bg-secondary/80 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <input
          placeholder="LinkedIn URL"
          value={form.linkedinUrl}
          onChange={e => setForm(p => ({ ...p, linkedinUrl: e.target.value }))}
          className="bg-secondary/80 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <div className="sm:col-span-2 lg:col-span-4">
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl py-3 text-sm transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            {isLoading ? "Generating Intelligence..." : "Generate Call Intelligence"}
          </motion.button>
        </div>
      </form>
    </GlassCard>
  );
};
