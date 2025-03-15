
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { BookOpen, ChevronDown, Search } from "lucide-react";
import { Link } from 'react-router-dom';

const courses = [
  {
    id: "1",
    title: "Web Development",
    code: "CS101",
    instructor: "Dr. Jane Smith",
    students: 32,
    schedule: "Mon, Wed, Fri - 10:00 AM",
    room: "Tech Building, Room 205",
    attendance: 94
  },
  {
    id: "2",
    title: "Data Structures",
    code: "CS201",
    instructor: "Prof. Michael Johnson",
    students: 28,
    schedule: "Tue, Thu - 2:00 PM",
    room: "Science Center, Room 103",
    attendance: 89
  },
  {
    id: "3",
    title: "Mobile App Development",
    code: "CS310",
    instructor: "Dr. Robert Davis",
    students: 24,
    schedule: "Mon, Wed - 1:30 PM",
    room: "Tech Building, Room 115",
    attendance: 92
  },
  {
    id: "4", 
    title: "Database Systems",
    code: "CS230",
    instructor: "Prof. Lisa Brown",
    students: 30,
    schedule: "Tue, Thu - 11:00 AM",
    room: "Main Hall, Room 302",
    attendance: 87
  }
];

const Courses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Courses');

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Courses</h1>
            <p className="text-foreground/70">Manage your classes and course materials</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button>
              <BookOpen className="w-4 h-4 mr-2" />
              Add New Course
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border glass"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative min-w-[180px]">
            <Button variant="outline" className="w-full justify-between">
              {selectedFilter}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <FadeIn key={course.id} delay={index * 50}>
              <GlassCard className="h-full" hoverEffect>
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-primary/10 text-primary rounded-lg p-3">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded font-medium">
                    {course.code}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
                <p className="text-foreground/70 text-sm mb-4">{course.instructor}</p>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                  <div>
                    <p className="text-xs text-foreground/50">Students</p>
                    <p className="font-medium">{course.students}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/50">Attendance</p>
                    <p className="font-medium">{course.attendance}%</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-foreground/50">Schedule</p>
                    <p className="font-medium">{course.schedule}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-foreground/50">Location</p>
                    <p className="font-medium">{course.room}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-border/40">
                  <Link 
                    to={`/courses/${course.id}`} 
                    className="text-sm text-primary hover:underline"
                  >
                    View Details
                  </Link>
                  <Button variant="outline" size="sm">
                    Take Attendance
                  </Button>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
