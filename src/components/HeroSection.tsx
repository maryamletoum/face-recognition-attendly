
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
                <Link to="/#features">
                  <Button variant="outline" size="lg" className="rounded-full h-12 px-6">
                    Learn More
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
                <span>Trusted by 1000+ educational institutions</span>
              </div>
            </FadeIn>
          </div>
          
          <FadeIn delay={300} className="relative">
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full transform -translate-y-4"></div>
              <div className="relative z-10">
                <GlassCard className="overflow-hidden w-full max-w-xl mx-auto aspect-[4/3] rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50 rounded-2xl"></div>
                  <div className="p-4 h-full relative">
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/60 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                      Live Demo
                    </div>
                    <div className="h-full flex flex-col justify-center items-center">
                      <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold mb-1">Face Recognition Demo</h3>
                        <p className="text-sm text-foreground/70 mb-4">Experience how it works in real-time</p>
                        <Button className="rounded-full">Try Demo</Button>
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
