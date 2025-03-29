
import React from 'react';
import FadeIn from './animations/FadeIn';
import GlassCard from './ui/GlassCard';
import { CheckCircle, Clock, Shield, Users, Database, BarChart3 } from 'lucide-react';

const features = [
  {
    title: 'Facial Recognition',
    description: 'Advanced AI algorithms accurately identify and verify students in seconds',
    icon: <CheckCircle className="w-10 h-10 text-primary" />,
  },
  {
    title: 'Real-time Tracking',
    description: 'Instantly record and track attendance with automatic time stamps',
    icon: <Clock className="w-10 h-10 text-primary" />,
  },
  {
    title: 'Secure & Private',
    description: 'Enterprise-grade security protecting student biometric data',
    icon: <Shield className="w-10 h-10 text-primary" />,
  },
  {
    title: 'Multi-user Access',
    description: 'Role-based access for administrators, teachers, and staff',
    icon: <Users className="w-10 h-10 text-primary" />,
  },
  {
    title: 'Comprehensive Reports',
    description: 'Generate detailed attendance reports for classes, individuals, or custom criteria',
    icon: <Database className="w-10 h-10 text-primary" />,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Visual insights into attendance patterns and trends',
    icon: <BarChart3 className="w-10 h-10 text-primary" />,
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-secondary/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Modern Institutions
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Our comprehensive attendance solution combines cutting-edge technology with intuitive design to transform how you track and manage attendance.
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 100}>
              <GlassCard className="h-full" hoverEffect>
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
