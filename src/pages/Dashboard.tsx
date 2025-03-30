import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  BarChart4,
  BookOpen,
  Calendar,
  ChevronDown,
  Cloud,
  Users,
  User,
  Settings,
  Menu,
  X,
  LogOut,
  UserPlus,
  ClipboardList,
} from "lucide-react";
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import StudentCard from '@/components/StudentCard';
import NotificationBell from '@/components/NotificationBell';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import RoleBasedAccess from '@/components/RoleBasedAccess';
import { useToast } from "@/hooks/use-toast";

const getRandomAttendancePercentage = () => {
  return Math.floor(Math.random() * 30) + 70; // Random between 70-99%
};

const recentStudents = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    attendancePercentage: getRandomAttendancePercentage(),
    lastAttendance: "Today, 9:05 AM",
    status: "present" as const,
  },
  {
    id: "2",
    name: "Emma Johnson",
    email: "emma.j@example.com",
    attendancePercentage: getRandomAttendancePercentage(),
    lastAttendance: "Today, 8:58 AM",
    status: "present" as const,
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.b@example.com",
    attendancePercentage: getRandomAttendancePercentage(),
    lastAttendance: "Today, 9:30 AM",
    status: "late" as const,
  },
  {
    id: "4",
    name: "Sophia Williams",
    email: "sophia.w@example.com",
    attendancePercentage: getRandomAttendancePercentage(),
    lastAttendance: "Yesterday, 8:45 AM",
    status: "absent" as const,
  },
];

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("Web Development");
  const [currentDate, setCurrentDate] = useState(new Date());
  const { userRole, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleAddTeacher = () => {
    toast({
      title: "Add Teacher",
      description: "Redirecting to teacher creation form",
    });
    navigate("/teachers/new");
  };
  
  const handleManageCourseAssignments = () => {
    toast({
      title: "Manage Course Assignments",
      description: "Redirecting to course assignment management",
    });
    navigate("/courses");
  };
  
  const handleSystemSettings = () => {
    toast({
      title: "System Settings",
      description: "Redirecting to system settings",
    });
    navigate("/settings");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border p-4 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-8 px-2">
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Attendly
          </span>
        </div>
        
        <nav className="flex-grow space-y-1">
          <Link 
            to="/dashboard" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium"
          >
            <BarChart4 className="w-5 h-5" />
            Dashboard
          </Link>
          
          <Link 
            to="/courses" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Courses
          </Link>
          
          <Link 
            to="/attendance" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Calendar className="w-5 h-5" />
            Attendance
          </Link>
          
          <Link 
            to="/students" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Users className="w-5 h-5" />
            Students
          </Link>
          
          <RoleBasedAccess allowedRoles={['admin']}>
            <Link 
              to="/teachers" 
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              Manage Teachers
            </Link>
          </RoleBasedAccess>
          
          <Link 
            to="/settings" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>
        
        <div className="border-t border-border pt-4 mt-auto">
          <GlassCard className="mb-4 bg-primary/5 border-primary/10">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Cloud className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm">AI Recognition</h3>
                <p className="text-xs text-foreground/70 mt-1">System operating normally</p>
              </div>
            </div>
          </GlassCard>
          
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="font-medium truncate">{isAdmin() ? 'Administrator' : 'Teacher'}</p>
              <p className="text-xs text-foreground/70 truncate">{localStorage.getItem('userEmail') || 'user@attendly.com'}</p>
            </div>
            <button 
              className="text-foreground/70 hover:text-foreground"
              onClick={logout}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>
      
      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div className="absolute top-0 left-0 bottom-0 w-64 bg-background" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                Attendly
              </span>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="p-4 space-y-1">
              <Link 
                to="/dashboard" 
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium"
              >
                <BarChart4 className="w-5 h-5" />
                Dashboard
              </Link>
              
              <Link 
                to="/courses" 
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Courses
              </Link>
              
              <Link 
                to="/attendance" 
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Attendance
              </Link>
              
              <Link 
                to="/students" 
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors"
              >
                <Users className="w-5 h-5" />
                Students
              </Link>
              
              <RoleBasedAccess allowedRoles={['admin']}>
                <Link 
                  to="/teachers" 
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <UserPlus className="w-5 h-5" />
                  Manage Teachers
                </Link>
              </RoleBasedAccess>
              
              <Link 
                to="/settings" 
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors"
              >
                <Settings className="w-5 h-5" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="flex-grow">
        {/* Header */}
        <header className="sticky top-0 z-20 glass border-b border-border py-3 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                className="md:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div>
                <h1 className="text-xl font-semibold">Dashboard</h1>
                <p className="text-sm text-foreground/70">
                  {new Date().toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <NotificationBell />
              
              <div className="relative">
                <button className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main dashboard */}
        <main className="p-4 md:p-6 pb-20">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold mb-2">
                Welcome back, {isAdmin() ? 'Administrator' : 'Teacher'}
              </h2>
              <p className="text-foreground/70">
                Here's what's happening with your classes today.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="h-9">
                <Calendar className="w-4 h-4 mr-2" />
                {currentDate.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
              </Button>
              
              <div className="relative">
                <Button variant="outline" size="sm" className="h-9 flex items-center gap-1">
                  <span>{selectedCourse}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Students", value: "156", icon: <Users className="w-5 h-5" />, change: "+3%" },
              { label: "Present Today", value: "132", icon: <User className="w-5 h-5" />, change: "+5%" },
              { label: "Absent Today", value: "18", icon: <User className="w-5 h-5" />, change: "-2%" },
              { label: "Average Attendance", value: "94%", icon: <BarChart4 className="w-5 h-5" />, change: "+1%" },
            ].map((stat, index) => (
              <FadeIn key={index} delay={index * 50}>
                <GlassCard className="h-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-foreground/70 text-sm">{stat.label}</p>
                      <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                    </div>
                    <div className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center",
                      index === 0 || index === 3 ? "bg-primary/10 text-primary" :
                      index === 1 ? "bg-green-500/10 text-green-500" :
                      "bg-amber-500/10 text-amber-500"
                    )}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center">
                    <span className={cn(
                      "text-xs",
                      stat.change.startsWith("+") ? "text-green-500" : "text-amber-500"
                    )}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-foreground/60 ml-1">vs. last week</span>
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
          
          {/* Admin-only actions */}
          <RoleBasedAccess allowedRoles={['admin']}>
            <FadeIn>
              <GlassCard className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Administrator Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button 
                    className="w-full flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    onClick={handleAddTeacher}
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add New Teacher</span>
                  </Button>
                  <Button 
                    className="w-full flex items-center gap-2 bg-purple-600 hover:bg-purple-700 transition-colors"
                    onClick={handleManageCourseAssignments}
                  >
                    <ClipboardList className="w-4 h-4" />
                    <span>Manage Course Assignments</span>
                  </Button>
                  <Button 
                    className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors"
                    onClick={handleSystemSettings}
                  >
                    <Settings className="w-4 h-4" />
                    <span>System Settings</span>
                  </Button>
                </div>
              </GlassCard>
            </FadeIn>
          </RoleBasedAccess>
          
          {/* Recent students section */}
          <FadeIn>
            <GlassCard>
              <h2 className="text-xl font-semibold mb-4">Recent Attendance</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentStudents.map((student) => (
                  <StudentCard 
                    key={student.id} 
                    student={student}
                  />
                ))}
              </div>
              <div className="mt-6 pt-3 border-t border-border/40">
                <Button variant="outline" className="w-full">
                  View All Students
                </Button>
              </div>
            </GlassCard>
          </FadeIn>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
