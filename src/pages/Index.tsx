import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopBar } from "@/components/dashboard/TopBar";
import { LinkedInWidget } from "@/components/dashboard/LinkedInWidget";
import { CompanySnapshot } from "@/components/dashboard/CompanySnapshot";
import { BuyingSignals } from "@/components/dashboard/BuyingSignals";
import { SmartCallOpener } from "@/components/dashboard/SmartCallOpener";
import { PainPointRadar } from "@/components/dashboard/PainPointRadar";
import { Gespraechsleitfaden } from "@/components/dashboard/Gespraechsleitfaden";
import { GoogleMapsWidget } from "@/components/dashboard/GoogleMapsWidget";
import { ActivityMap } from "@/components/dashboard/ActivityMap";
import { generateMockData, type ProspectData } from "@/lib/mockData";

const Index = () => {
  const [data, setData] = useState<ReturnType<typeof generateMockData> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = (prospect: ProspectData) => {
    setIsLoading(true);
    setData(null);
    // Simulate AI processing
    setTimeout(() => {
      setData(generateMockData(prospect));
      setIsLoading(false);
    }, 1500);
  };

  const handleRegenerate = () => {
    if (!data) return;
    // Just regenerate openers with slight variation
    setData(prev => prev ? { ...prev, openers: generateMockData({ name: "", company: "", website: "", linkedinUrl: "" }).openers } : prev);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-[1400px] mx-auto">
        <TopBar onGenerate={handleGenerate} isLoading={isLoading} />

        <AnimatePresence>
          {data && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
            >
              {/* Row 1: LinkedIn + Company Snapshot */}
              <div className="md:col-span-1">
                <LinkedInWidget data={data.linkedin} />
              </div>
              <div className="md:col-span-1">
                <CompanySnapshot data={data.company} />
              </div>
              <div className="md:col-span-1 lg:col-span-1">
                <BuyingSignals data={data.buyingSignals} />
              </div>

              {/* Row 2: Call Openers + Pain Points + Guide */}
              <div className="md:col-span-1">
                <SmartCallOpener openers={data.openers} onRegenerate={handleRegenerate} />
              </div>
              <div className="md:col-span-1">
                <PainPointRadar painPoints={data.painPoints} />
              </div>
              <div className="md:col-span-1">
                <Gespraechsleitfaden steps={data.guide} />
              </div>

              {/* Row 3: Map + Activity */}
              <div className="md:col-span-1 lg:col-span-2">
                <GoogleMapsWidget locations={data.locations} />
              </div>
              <div className="md:col-span-1">
                <ActivityMap activity={data.activity} />
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
            <h2 className="text-xl font-semibold text-foreground mb-2">Ready for your next call?</h2>
            <p className="text-sm text-muted-foreground max-w-md">
              Enter a prospect's details above and generate AI-powered call intelligence in seconds.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
