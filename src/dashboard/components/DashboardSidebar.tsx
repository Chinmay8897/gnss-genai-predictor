import { motion } from "framer-motion";
import { 
  Home, 
  Database, 
  Brain, 
  BarChart3, 
  TrendingUp, 
  Play,
  Menu,
  Satellite,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSection } from "./Dashboard";

interface SidebarItem {
  id: DashboardSection;
  label: string;
  icon: typeof Home;
}

const sidebarItems: SidebarItem[] = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "dataset", label: "Dataset", icon: Database },
  { id: "models", label: "Models", icon: Brain },
  { id: "results", label: "Results", icon: BarChart3 },
  { id: "error-distribution", label: "Error Distribution", icon: TrendingUp },
  { id: "demo", label: "Demo", icon: Play },
];

interface DashboardSidebarProps {
  activeSection: DashboardSection;
  onSectionChange: (section: DashboardSection) => void;
  collapsed: boolean;
  onToggleCollapse: (collapsed: boolean) => void;
}

export function DashboardSidebar({
  activeSection,
  onSectionChange,
  collapsed,
  onToggleCollapse,
}: DashboardSidebarProps) {
  return (
    <motion.div
      className={`fixed left-0 top-0 z-50 h-screen bg-gradient-surface border-r border-sidebar-border transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
      initial={false}
      animate={{ width: collapsed ? 64 : 256 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="p-2 bg-gradient-primary rounded-lg shadow-glow-primary">
              <Satellite className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">GNSS AI</h1>
              <p className="text-xs text-sidebar-foreground/60">Error Forecasting</p>
            </div>
          </motion.div>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggleCollapse(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.div key={item.id} className="relative">
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size={collapsed ? "icon" : "default"}
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full justify-start transition-all duration-200 ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  } ${collapsed ? "px-3" : "px-4"}`}
                >
                  <Icon className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </Button>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-sidebar-primary rounded-r"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <motion.div
          className="absolute bottom-4 left-4 right-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="p-3 bg-sidebar-accent rounded-lg border border-sidebar-border">
            <p className="text-xs text-sidebar-foreground/80 mb-1">AI Model Status</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-xs text-sidebar-foreground">Online</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
