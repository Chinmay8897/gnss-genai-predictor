import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  glow?: boolean;
}

export function DashboardCard({
  title,
  description,
  children,
  className,
  gradient = false,
  glow = false,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      className={cn(
        "transition-all duration-200",
        glow && "hover:shadow-glow-primary"
      )}
    >
      <Card 
        className={cn(
          "shadow-card border-border/50 backdrop-blur-sm",
          gradient && "bg-gradient-surface",
          className
        )}
      >
        {(title || description) && (
          <CardHeader>
            {title && (
              <CardTitle className="text-card-foreground flex items-center space-x-2">
                {title}
              </CardTitle>
            )}
            {description && (
              <CardDescription className="text-muted-foreground">
                {description}
              </CardDescription>
            )}
          </CardHeader>
        )}
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}
