
import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  border?: boolean;
};

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hoverEffect = false,
  border = true,
}) => {
  return (
    <div
      className={cn(
        "glass rounded-xl p-6",
        border && "border border-white/20 dark:border-white/10",
        hoverEffect && "transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
