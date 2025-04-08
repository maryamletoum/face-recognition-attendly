import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { Plus, Search, UserPlus, Download, Edit, Trash } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import BackButton from '@/components/BackButton';

// Sample teacher data
const teachers = [
  {
    id: "1",
    name: "Dr. Robert Smith",
    email: "robert.smith@example.com",
    subjects: "Web Development, Mobile App Development",
    joinDate: "Jan 15, 2023",
    status: "Active"
  },
  {
    id: "2",
    name: "Prof. Emily Johnson",
    email: "emily.johnson@example.com",
    subjects: "Database Systems, Data Structures",
    joinDate: "Feb 3, 2023",
    status: "Active"
  },
  {
    id: "3",
    name: "Dr. Michael Williams",
    email: "michael.williams@example.com",
    subjects: "Web Development, UI/UX Design",
    joinDate: "Jan 10, 2023",
    status: "Active"
  },
  {
    id: "4",
    name: "Prof. Sarah Davis",
    email: "sarah.davis@example.com",
    subjects: "Mobile App Development, Data Structures",
    joinDate: "Mar 5, 2023",
    status: "On Leave"
  }
];

const Teachers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.subjects.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTeacher = () => {
    navigate('/teachers/new');
  };
  
  const handleEditTeacher = (id: string) => {
    navigate(`/teachers/edit/${id}`);
  };
  
  const handleDeleteTeacher = (id: string, name: string) => {
    toast({
      title: "Teacher Removed",
      description: `${name} has been removed successfully`,
    });
    // In a real app, you'd make an API call to delete the teacher
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Teachers</h1>
            <p className="text-foreground/70">
              Manage teaching staff
            </p>
          </div>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <BackButton />
            <Button onClick={handleAddTeacher}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Teacher
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border glass"
              placeholder="Search teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <FadeIn>
          <GlassCard>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="text-left py-3 px-4 font-medium text-foreground/70">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground/70">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground/70">Subjects</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground/70">Join Date</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground/70">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground/70">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                            {teacher.name.charAt(0)}
                          </div>
                          <span>{teacher.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-foreground/70">{teacher.email}</td>
                      <td className="py-3 px-4">{teacher.subjects}</td>
                      <td className="py-3 px-4 text-foreground/70">{teacher.joinDate}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          teacher.status === 'Active' 
                            ? 'bg-green-500/10 text-green-500' 
                            : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          {teacher.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditTeacher(teacher.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-100"
                            onClick={() => handleDeleteTeacher(teacher.id, teacher.name)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-foreground/70">
                Showing {filteredTeachers.length} of {teachers.length} teachers
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
};

export default Teachers;
