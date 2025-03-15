
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { Download, Plus, Search, UserPlus } from "lucide-react";

const students = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    course: "Web Development",
    enrollmentDate: "Aug 10, 2023",
    attendance: "94%"
  },
  {
    id: "2",
    name: "Emma Johnson",
    email: "emma.j@example.com",
    course: "Data Structures",
    enrollmentDate: "Aug 8, 2023",
    attendance: "89%"
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.b@example.com",
    course: "Mobile App Development",
    enrollmentDate: "Aug 12, 2023",
    attendance: "92%"
  },
  {
    id: "4",
    name: "Sophia Williams",
    email: "sophia.w@example.com",
    course: "Database Systems",
    enrollmentDate: "Aug 5, 2023",
    attendance: "87%"
  },
  {
    id: "5",
    name: "Daniel Jones",
    email: "daniel.j@example.com",
    course: "Web Development",
    enrollmentDate: "Aug 9, 2023",
    attendance: "96%"
  },
  {
    id: "6",
    name: "Olivia Taylor",
    email: "olivia.t@example.com",
    course: "Mobile App Development",
    enrollmentDate: "Aug 11, 2023",
    attendance: "90%"
  },
  {
    id: "7",
    name: "James Anderson",
    email: "james.a@example.com",
    course: "Database Systems",
    enrollmentDate: "Aug 7, 2023",
    attendance: "88%"
  },
  {
    id: "8",
    name: "Emily Thomas",
    email: "emily.t@example.com",
    course: "Data Structures",
    enrollmentDate: "Aug 6, 2023",
    attendance: "93%"
  }
];

const Students: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Students</h1>
            <p className="text-foreground/70">View and manage student information</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline">
              <UserPlus className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border glass"
              placeholder="Search students..."
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
                    <th className="text-left py-3 px-4 font-medium text-foreground/70">Course</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground/70">Enrollment Date</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground/70">Attendance</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground/70">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                            {student.name.charAt(0)}
                          </div>
                          <span>{student.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-foreground/70">{student.email}</td>
                      <td className="py-3 px-4">{student.course}</td>
                      <td className="py-3 px-4 text-foreground/70">{student.enrollmentDate}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-sm bg-green-500/10 text-green-500">
                          {student.attendance}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-foreground/70">
                Showing {filteredStudents.length} of {students.length} students
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
};

export default Students;
