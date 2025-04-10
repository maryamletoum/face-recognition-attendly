import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  BarChart4,
  BookOpen,
  Calendar,
  ChevronDown,
  Clock,
  Cloud,
  Users,
  User,
  Settings,
  Menu,
  X,
  LogOut,
  UserPlus,
  ClipboardList,
  GraduationCap,
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

const myCourses = [
  {
    id: "1",
    name: "Web Development",
    instructor: "Prof. Jane Doe",
    schedule: "Mon/Wed/Fri 10:00 AM",
    attendanceRate: 92,
    lastAttendance: "Today, 10:05 AM",
  },
  {
    id: "2",
    name: "Data Structures",
    instructor: "Prof. Robert Smith",
    schedule: "Tue/Thu 2:00 PM",
    attendanceRate: 85,
    lastAttendance: "Yesterday, 2:00 PM",
  },
  {
    id: "3",
    name: "Mobile App Development",
    instructor: "Prof. Maria Garcia",
    schedule: "Mon/Wed 1:00 PM",
    attendanceRate: 78,
    lastAttendance: "Mon, Apr 8, 1:00 PM",
  },
];

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("Web Development");
  const [currentDate, setCurrentDate] = useState(new Date());
  const { userRole, logout, isAdmin, userEmail } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isStudent = () => userRole === 'student';
  
  const studentId = userEmail?.startsWith('student-') 
    ? userEmail.replace('student-', '')
    : null;
  
  const studentInfo = {
    id: studentId || "0",
    name: `Student ${studentId || ""}`,
    email: userEmail || "",
    attendancePercentage: 89,
    lastAttendance: "Today, 9:05 AM",
    status: "present" as const,
  };
  
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
          
          <RoleBasedAccess allowedRoles={['admin', 'teacher']}>
            <Link 
              to="/students" 
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Users className="w-5 h-5" />
              Students
            </Link>
          </RoleBasedAccess>
          
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
              {isStudent() ? (
                <GraduationCap className="w-5 h-5 text-primary" />
              ) : (
                <User className="w-5 h-5 text-primary" />
              )}
            </div>
            <div className="flex-grow min-w-0">
              <p className="font-medium truncate">
                {isAdmin() ? 'Administrator' : isStudent() ? 'Student' : 'Teacher'}
              </p>
              <p className="text-xs text-foreground/70 truncate">{userEmail || 'user@attendly.com'}</p>
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
              
              <RoleBasedAccess allowedRoles={['admin', 'teacher']}>
                <Link 
                  to="/students" 
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <Users className="w-5 h-5" />
                  Students
                </Link>
              </RoleBasedAccess>
              
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
                  {isStudent() ? (
                    <GraduationCap className="w-5 h-5 text-primary" />
                  ) : (
                    <User className="w-5 h-5 text-primary" />
                  )}
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
                Welcome back, {isAdmin() ? 'Administrator' : isStudent() ? `Student ${studentId}` : 'Teacher'}
              </h2>
              <p className="text-foreground/70">
                {isStudent() 
                  ? "Here's your personal attendance information."
                  : "Here's what's happening with your classes today."}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="h-9">
                <Calendar className="w-4 h-4 mr-2" />
                {currentDate.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
              </Button>
              
              {!isStudent() && (
                <div className="relative">
                  <Button variant="outline" size="sm" className="h-9 flex items-center gap-1">
                    <span>{selectedCourse}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Student view */}
          {isStudent() ? (
            <>
              {/* Student stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <FadeIn delay={0}>
                  <GlassCard className="h-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-foreground/70 text-sm">Overall Attendance</p>
                        <h3 className="text-2xl font-semibold mt-1">89%</h3>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <BarChart4 className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center">
                      <span className="text-xs text-green-500">+2%</span>
                      <span className="text-xs text-foreground/60 ml-1">vs. last month</span>
                    </div>
                  </GlassCard>
                </FadeIn>
                
                <FadeIn delay={50}>
                  <GlassCard className="h-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-foreground/70 text-sm">Present Days</p>
                        <h3 className="text-2xl font-semibold mt-1">42</h3>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center">
                      <span className="text-xs text-foreground/60">Total school days: 48</span>
                    </div>
                  </GlassCard>
                </FadeIn>
                
                <FadeIn delay={100}>
                  <GlassCard className="h-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-foreground/70 text-sm">Absences</p>
                        <h3 className="text-2xl font-semibold mt-1">4</h3>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center">
                      <span className="text-xs text-amber-500">3 excused</span>
                      <span className="text-xs text-foreground/60 ml-1">1 unexcused</span>
                    </div>
                  </GlassCard>
                </FadeIn>
                
                <FadeIn delay={150}>
                  <GlassCard className="h-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-foreground/70 text-sm">Late Arrivals</p>
                        <h3 className="text-2xl font-semibold mt-1">2</h3>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                        <Clock className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center">
                      <span className="text-xs text-foreground/60">Average delay: 8 mins</span>
                    </div>
                  </GlassCard>
                </FadeIn>
              </div>
              
              {/* My courses section */}
              <FadeIn>
                <GlassCard className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">My Courses</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/40">
                          <th className="text-left py-3 px-4 font-medium text-foreground/70">Course</th>
                          <th className="text-left py-3 px-4 font-medium text-foreground/70">Instructor</th>
                          <th className="text-left py-3 px-4 font-medium text-foreground/70">Schedule</th>
                          <th className="text-left py-3 px-4 font-medium text-foreground/70">Attendance</th>
                          <th className="text-left py-3 px-4 font-medium text-foreground/70">Last Attended</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myCourses.map((course) => (
                          <tr key={course.id} className="border-b border-border/20 hover:bg-secondary hover:text-foreground transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                  {course.name.charAt(0)}
                                </div>
                                <span>{course.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-foreground/70">{course.instructor}</td>
                            <td className="py-3 px-4">{course.schedule}</td>
                            <td className="py-3 px-4">
                              <span className={cn(
                                "px-2 py-1 rounded-full text-sm",
                                course.attendanceRate >= 90 ? "bg-green-500/10 text-green-500" :
                                course.attendanceRate >= 80 ? "bg-amber-500/10 text-amber-500" :
                                "bg-red-500/10 text-red-500"
                              )}>
                                {course.attendanceRate}%
                              </span>
                            </td>
                            <td className="py-3 px-4 text-foreground/70">{course.lastAttendance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </GlassCard>
              </FadeIn>
              
              {/* Student profile card */}
              <FadeIn>
                <GlassCard className="max-w-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Student {studentId}</h3>
                      <p className="text-foreground/70">ID: {studentId}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-sm text-foreground/70">Email</p>
                      <p>{userEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70">Status</p>
                      <p className="text-green-500">Active</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70">Program</p>
                      <p>Computer Science</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70">Year</p>
                      <p>2nd Year</p>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => navigate("/attendance")}>
                    View Full Attendance History
                  </Button>
                </GlassCard>
              </FadeIn>
            </>
          ) : (
            <>
              {/* Stats cards for admin/teacher */}
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
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
