
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import FadeIn from './animations/FadeIn';
import GlassCard from './ui/GlassCard';

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen pt-24 pb-20 flex items-center">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <FadeIn direction="up">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                Next Generation Attendance System
              </span>
            </FadeIn>
            <FadeIn direction="up" delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Smart Attendance with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">Face Recognition</span>
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={200}>
              <p className="text-lg text-foreground/80 max-w-lg">
                Streamline your attendance process with our advanced face recognition system. 
                Save time, enhance accuracy, and focus on what matters most.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={300}>
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button size="lg" className="rounded-full h-12 px-6">
                    Get Started
                  </Button>
                </Link>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={400}>
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-xs text-white font-medium border-2 border-background"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span>Trusted by 100+ educational institutions</span>
              </div>
            </FadeIn>
          </div>
          
          <FadeIn delay={300} className="relative">
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full transform -translate-y-4"></div>
              <div className="relative z-10">
                <GlassCard className="overflow-hidden w-full max-w-xl mx-auto aspect-[4/3] rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50 rounded-2xl"></div>
                  <div className="p-8 h-full relative">
                    <div className="h-full flex flex-col justify-center items-center text-center">
                      <h3 className="text-2xl font-semibold mb-4">Modern Attendance Solution</h3>
                      <p className="text-foreground/70 mb-6 max-w-md">
                        Our smart attendance system helps educational institutions 
                        streamline attendance tracking with advanced technology.
                      </p>
                      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                        <div className="flex flex-col items-center p-4 bg-primary/10 rounded-lg">
                          <div className="text-3xl font-bold text-primary mb-1">99%</div>
                          <div className="text-sm text-foreground/70">Accuracy</div>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-primary/10 rounded-lg">
                          <div className="text-3xl font-bold text-primary mb-1">5x</div>
                          <div className="text-sm text-foreground/70">Faster</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/4 right-0 -translate-y-1/2 translate-x-1/2 w-16 h-16 rounded-full bg-primary/30 backdrop-blur-md animate-float"></div>
            <div className="absolute bottom-1/4 left-0 -translate-x-1/2 w-12 h-12 rounded-full bg-primary/20 backdrop-blur-md animate-float" style={{ animationDelay: '1s' }}></div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
