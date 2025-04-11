import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FadeIn from '@/components/animations/FadeIn';
import GlassCard from '@/components/ui/GlassCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';
import StudentLogin from '@/components/StudentLogin';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('teacher');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      // Store role information for authorization in the app
      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', email);
      
      toast({
        title: `Welcome back, ${role === 'admin' ? 'Administrator' : 'Teacher'}!`,
        description: "You have successfully logged in.",
      });
      window.location.href = '/dashboard';
    }, 1500);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      
      // Store role information for authorization in the app
      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', name);
      
      toast({
        title: "Account created!",
        description: `Your ${role === 'admin' ? 'administrator' : 'teacher'} account has been successfully created.`,
      });
      window.location.href = '/dashboard';
    }, 1500);
  };

  const handleStudentLogin = (studentId: string, password: string) => {
    // Store student role information for authorization in the app
    localStorage.setItem('userRole', 'student');
    localStorage.setItem('userEmail', `student-${studentId}`);
    
    toast({
      title: "Student login successful",
      description: "Welcome to your student portal",
    });
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <FadeIn direction="left">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-4">Welcome to Attendly</h1>
                <p className="text-foreground/70 mb-8 max-w-md mx-auto md:mx-0">
                  The next generation attendance system for modern educational institutions. Sign in to access your dashboard.
                </p>
                <div className="hidden md:block">
                  <GlassCard className="border border-primary/10">
                    <h3 className="text-lg font-medium mb-2">Why choose Attendly?</h3>
                    <ul className="space-y-2 text-foreground/70">
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <span>99.9% accuracy in face recognition</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <span>GDPR compliant & secure</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <span>Used by 100+ institutions worldwide</span>
                      </li>
                    </ul>
                  </GlassCard>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="right" delay={100}>
              <GlassCard className="max-w-md mx-auto">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="login">Staff Login</TabsTrigger>
                    <TabsTrigger value="signup">Staff Signup</TabsTrigger>
                    <TabsTrigger value="student">Student Login</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <Input 
                          id="password" 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Account Type</Label>
                        <RadioGroup 
                          defaultValue="teacher" 
                          value={role}
                          onValueChange={setRole}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="teacher" id="teacher" />
                            <Label htmlFor="teacher" className="cursor-pointer">Teacher</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="admin" id="admin" />
                            <Label htmlFor="admin" className="cursor-pointer">Administrator</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign in"}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email-signup">Email</Label>
                        <Input 
                          id="email-signup" 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password-signup">Password</Label>
                        <Input 
                          id="password-signup" 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required 
                        />
                        <p className="text-xs text-foreground/60">
                          Password must be at least 8 characters long
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Account Type</Label>
                        <RadioGroup 
                          defaultValue="teacher" 
                          value={role}
                          onValueChange={setRole}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="teacher" id="teacher-signup" />
                            <Label htmlFor="teacher-signup" className="cursor-pointer">Teacher</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="admin" id="admin-signup" />
                            <Label htmlFor="admin-signup" className="cursor-pointer">Administrator</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Create account"}
                      </Button>
                      
                      <p className="text-xs text-center text-foreground/60">
                        By signing up, you agree to our{" "}
                        <Link to="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="student">
                    <StudentLogin onLogin={handleStudentLogin} />
                  </TabsContent>
                </Tabs>
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
