import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { TopBar } from "@/components/dashboard/TopBar";
import { CompanySnapshot } from "@/components/dashboard/CompanySnapshot";
import { BuyingSignals } from "@/components/dashboard/BuyingSignals";
import { SmartCallOpener } from "@/components/dashboard/SmartCallOpener";
import { PainPointRadar } from "@/components/dashboard/PainPointRadar";
import { Gespraechsleitfaden } from "@/components/dashboard/Gespraechsleitfaden";
import { GoogleMapsWidget } from "@/components/dashboard/GoogleMapsWidget";
import type { ProspectData, CompanyData, BuyingSignalData, CallOpener, PainPoint, GuideStep, LocationData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";

interface IntelligenceData {
  company: CompanyData;
  buyingSignals: BuyingSignalData;
  openers: CallOpener[];
  painPoints: PainPoint[];
  guide: GuideStep[];
  locations: LocationData[];
}

const Index = () => {
  const [data, setData] = useState<IntelligenceData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGenerate = async (prospect: ProspectData) => {
    setIsLoading(true);
    setData(null);

    try {
      const { data: result, error } = await supabase.functions.invoke("generate-intelligence", {
        body: prospect,
      });

      if (error) throw error;
      if (result?.error) throw new Error(result.error);

      setData(result);
    } catch (e: any) {
      console.error("Error generating intelligence:", e);
      toast({
        title: "Fehler",
        description: e.message || "Intelligence konnte nicht generiert werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!data) return;
    // Simple re-trigger with empty prospect to get new openers
    try {
      const { data: result } = await supabase.functions.invoke("generate-intelligence", {
        body: { name: "", company: "", website: "" },
      });
      if (result?.openers) {
        setData(prev => prev ? { ...prev, openers: result.openers } : prev);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-end mb-2">
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Abmelden
          </button>
        </div>

        <TopBar onGenerate={handleGenerate} isLoading={isLoading} />

        <AnimatePresence>
          {data && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
            >
              <div className="md:col-span-1">
                <CompanySnapshot data={data.company} />
              </div>
              <div className="md:col-span-1">
                <BuyingSignals data={data.buyingSignals} />
              </div>
              <div className="md:col-span-1">
                <SmartCallOpener openers={data.openers} onRegenerate={handleRegenerate} />
              </div>
              <div className="md:col-span-1">
                <PainPointRadar painPoints={data.painPoints} />
              </div>
              <div className="md:col-span-1">
                <Gespraechsleitfaden steps={data.guide} />
              </div>
              <div className="md:col-span-1">
                <GoogleMapsWidget locations={data.locations} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!data && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <span className="text-3xl">🎯</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Bereit für deinen nächsten Call?</h2>
            <p className="text-sm text-muted-foreground max-w-md">
              Gib oben die Daten deines Prospects ein und erhalte KI-gestützte Call-Intelligence in Sekunden.
            </p>
          </motion.div>
        )}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full mb-4"
            />
            <p className="text-sm text-muted-foreground">KI analysiert Unternehmensdaten...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
