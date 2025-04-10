
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import GlassCard from './ui/GlassCard';
import { User, Key, LogIn } from 'lucide-react';

type StudentLoginProps = {
  onLogin: (studentId: string, password: string) => void;
  className?: string;
};

const StudentLogin: React.FC<StudentLoginProps> = ({ onLogin, className }) => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      if (studentId && password) {
        onLogin(studentId, password);
        toast({
          title: "Login successful",
          description: "Welcome back to the student portal",
        });
      } else {
        toast({
          title: "Login failed",
          description: "Please check your student ID and password",
          variant: "destructive"
        });
      }
    }, 1000);
  };

  return (
    <GlassCard className={className}>
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold">Student Login</h2>
        <p className="text-foreground/70 text-sm">Access your attendance records</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="studentId">Student ID</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-4 h-4" />
            <Input
              id="studentId"
              type="text"
              placeholder="Enter your student ID"
              className="pl-10"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-4 h-4" />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          ) : (
            <span className="flex items-center">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </span>
          )}
        </Button>
        
        <div className="text-center pt-2">
          <a href="#" className="text-sm text-primary hover:underline">Forgot your password?</a>
        </div>
      </form>
    </GlassCard>
  );
};

export default StudentLogin;
