import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardSidebar } from "./DashboardSidebar";
import { OverviewSection } from "./sections/OverviewSection";
import { DatasetSection } from "./sections/DatasetSection";
import { ModelsSection } from "./sections/ModelsSection";
import { ResultsSection } from "./sections/ResultsSection";
import { ErrorDistributionSection } from "./sections/ErrorDistributionSection";
import { DemoSection } from "./sections/DemoSection";

export type DashboardSection = 
  | "overview" 
  | "dataset" 
  | "models" 
  | "results" 
  | "error-distribution" 
  | "demo";

const sectionComponents = {
  overview: OverviewSection,
  dataset: DatasetSection,
  models: ModelsSection,
  results: ResultsSection,
  "error-distribution": ErrorDistributionSection,
  demo: DemoSection,
};

export function Dashboard() {
  const [activeSection, setActiveSection] = useState<DashboardSection>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const ActiveComponent = sectionComponents[activeSection];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex w-full">
        <DashboardSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          collapsed={sidebarCollapsed}
          onToggleCollapse={setSidebarCollapsed}
        />
        
        <main 
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? "ml-16" : "ml-64"
          }`}
        >
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ActiveComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
