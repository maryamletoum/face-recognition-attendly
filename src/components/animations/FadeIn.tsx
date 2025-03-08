
import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  once?: boolean;
  threshold?: number; // between 0 and 1
};

const FadeIn: React.FC<FadeInProps> = ({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 500,
  once = true,
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && domRef.current) {
              observer.unobserve(domRef.current);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, threshold]);

  const getDirectionClass = () => {
    switch (direction) {
      case 'up': return 'animate-fade-in';
      case 'down': return 'animate-fade-in translate-y-[-10px]';
      case 'left': return 'animate-fade-in-left';
      case 'right': return 'animate-fade-in-right';
      default: return 'animate-fade-in';
    }
  };

  const getVisibilityClasses = () => {
    return isVisible
      ? `opacity-100 transform-none transition-all duration-${duration} ease-out`
      : `opacity-0 transform translate-y-4 transition-all duration-${duration} ease-out`;
  };

  const getDelayStyle = () => {
    return {
      transitionDelay: `${delay}ms`,
      animationDelay: `${delay}ms`,
    };
  };

  return (
    <div
      ref={domRef}
      className={cn(
        isVisible ? getDirectionClass() : 'opacity-0',
        'animate-once',
        className
      )}
      style={getDelayStyle()}
    >
      {children}
    </div>
  );
};

export default FadeIn;
