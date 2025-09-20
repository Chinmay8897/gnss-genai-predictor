import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description: string;
  explanation: string;
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  glow?: boolean;
  height?: number;
}

// Custom typing effect hook
const useTypingEffect = (text: string, speed: number = 30, shouldStart: boolean = false) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!shouldStart) {
      setDisplayText("");
      setIsComplete(false);
      return;
    }

    // Clear any existing text first
    setDisplayText("");
    setIsComplete(false);

    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => {
      clearInterval(timer);
    };
  }, [text, speed, shouldStart]);

  return { displayText, isComplete };
};

interface ChartCardProps {
  title: string;
  description: string;
  explanation: string;
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  height?: number;
}

export function ChartCard({
  title,
  description,
  explanation,
  children,
  className,
  gradient = true,
  height,
}: ChartCardProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Start typing effect when card comes into view
  const shouldStartTyping = isInView;
  const { displayText, isComplete } = useTypingEffect(explanation, 30, shouldStartTyping);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("transition-all duration-300", className)}
      style={{ height: height ? `${height}px` : 'auto' }}
    >
      <Card
        className={cn(
          "h-full relative overflow-hidden border",
          gradient && "bg-gradient-to-br from-card/90 via-card to-card/90"
        )}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-foreground">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Chart content */}
          <div className="mb-4">
            {children}
          </div>

          {/* Typing effect explanation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 10
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-4 bg-muted/30 rounded-lg border border-border"
          >
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
              <div className="text-sm text-muted-foreground leading-relaxed min-h-[1.5rem] relative">
                <span className="font-medium text-foreground">Analysis: </span>
                <motion.span
                  key={shouldStartTyping ? "typing" : "placeholder"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  {shouldStartTyping ? (
                    <>
                      {displayText}
                      {!isComplete && (
                        <span className="inline-block w-0.5 h-4 bg-primary ml-1 animate-pulse" />
                      )}
                    </>
                  ) : (
                    <span className="opacity-50">
                      Scroll to view analysis...
                    </span>
                  )}
                </motion.span>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}