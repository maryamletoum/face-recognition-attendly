
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from "@/components/ui/button";
import { BookOpen, User, Settings, FileEdit, Calendar, Clock } from 'lucide-react';
import CourseManagement from '@/components/CourseManagement';
import AdminDeprivationSettings from '@/components/AdminDeprivationSettings';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'courses' | 'settings'>('courses');

  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Admin Dashboard
            </h1>
            <p className="text-foreground/70">
              Manage courses, instructor assignments, and attendance policies
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <GlassCard className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-all" hoverEffect>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">Course Management</h3>
            <p className="text-sm text-foreground/70 mb-4">Create, edit and archive courses</p>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setActiveTab('courses')}
            >
              Manage Courses
            </Button>
          </GlassCard>
          
          <GlassCard className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-all" hoverEffect>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <User className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">Instructor Assignment</h3>
            <p className="text-sm text-foreground/70 mb-4">Assign courses to instructors</p>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setActiveTab('courses')}
            >
              Assign Instructors
            </Button>
          </GlassCard>
          
          <GlassCard className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-all" hoverEffect>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">Attendance Settings</h3>
            <p className="text-sm text-foreground/70 mb-4">Configure attendance policy and thresholds</p>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setActiveTab('settings')}
            >
              Manage Settings
            </Button>
          </GlassCard>
        </div>
        
        <div className="mb-6">
          {activeTab === 'courses' ? (
            <CourseManagement />
          ) : (
            <AdminDeprivationSettings />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
