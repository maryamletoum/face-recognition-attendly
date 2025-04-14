
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, BookOpen, Settings, Bell, User, LogOut } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useAuth } from '@/contexts/AuthContext';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { isAdmin, isTeacher, isStudent, logout } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed top-0 left-0 h-full w-16 md:w-64 bg-background/80 backdrop-blur-xl border-r border-border/50 z-50 flex flex-col">
      <div className="p-4 flex items-center justify-center md:justify-start">
        <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
          <CalendarDays className="text-primary-foreground" />
        </div>
        <span className="ml-2 font-bold text-lg hidden md:block">AttendTrack</span>
      </div>
      
      <div className="flex-1 py-8">
        <nav className="space-y-1 px-2">
          <Link to="/">
            <Button 
              variant={isActive('/') ? "default" : "ghost"} 
              className={cn(
                "w-full justify-start",
                isActive('/') ? "" : "text-foreground/70"
              )}
            >
              <CalendarDays className="w-5 h-5 mr-0 md:mr-3" />
              <span className="hidden md:block">Dashboard</span>
            </Button>
          </Link>
          
          <Link to="/attendance">
            <Button 
              variant={isActive('/attendance') ? "default" : "ghost"} 
              className={cn(
                "w-full justify-start",
                isActive('/attendance') ? "" : "text-foreground/70"
              )}
            >
              <Users className="w-5 h-5 mr-0 md:mr-3" />
              <span className="hidden md:block">Attendance</span>
            </Button>
          </Link>
          
          <Link to="/courses">
            <Button 
              variant={isActive('/courses') ? "default" : "ghost"} 
              className={cn(
                "w-full justify-start",
                isActive('/courses') ? "" : "text-foreground/70"
              )}
            >
              <BookOpen className="w-5 h-5 mr-0 md:mr-3" />
              <span className="hidden md:block">Courses</span>
            </Button>
          </Link>
          
          {isAdmin() && (
            <Link to="/admin">
              <Button 
                variant={isActive('/admin') ? "default" : "ghost"} 
                className={cn(
                  "w-full justify-start",
                  isActive('/admin') ? "" : "text-foreground/70"
                )}
              >
                <Settings className="w-5 h-5 mr-0 md:mr-3" />
                <span className="hidden md:block">Admin</span>
              </Button>
            </Link>
          )}
        </nav>
      </div>
      
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center justify-center md:justify-start py-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User className="w-4 h-4" />
          </div>
          <div className="ml-3 hidden md:block">
            <p className="text-sm font-medium">
              {isAdmin() ? 'Administrator' : isTeacher() ? 'Teacher' : 'Student'}
            </p>
            <p className="text-xs text-foreground/70">
              {isAdmin() ? 'Full access' : isTeacher() ? 'Teaching staff' : 'Limited access'}
            </p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start mt-2 text-foreground/70"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-0 md:mr-3" />
          <span className="hidden md:block">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
